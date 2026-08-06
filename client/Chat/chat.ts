import { ChatConfiguration, GeneratedMessage, MessageBuffer } from '../typings/Chat';
import { Web } from '../Web/Web';
import { CHAT_CONFIG } from './cfg';

export class Chat {
  private static buffer: MessageBuffer[] = [];
  private static instance: Web;
  private static rules: ChatConfiguration | undefined = undefined;
  public static focusState: boolean;
  private static _inited: boolean = false;
  private constructor() {
    Chat.instance = new Web();
    Chat.focusState = false;
  }
  static init() {
    if (Chat._inited) {
      console.error('[init]: Chat is already initialized!');
      return;
    }
    new Chat();
    Chat._inited = true;

    RegisterKeyMapping('client_open_chat', 'Open Chat', 'keyboard', 'T');

    console.log('[init]:Chat initialized!');
    RegisterCommand(
      'client_open_chat',
      () => {
        Chat.focus();
      },
      false,
    );
    Chat.instance.addEventNUIListender('chat:client:unFocus', (data, cb) => {
      SetNuiFocus(false, false);
      Chat.focusState = false;
      cb({ ok: true });
    });
    Chat.instance.addEventNUIListender('chat:client:confirmMessage',(data,cb)=>{

    })
  }
  static setRules(configuration: ChatConfiguration): boolean {
    if (Chat.rules === configuration) {
      console.error('[setRules]: Prevented from setting same chat configuration!');
      return false;
    }
    Chat.rules = configuration;
    return true;
  }
  static focus() {
    Chat.instance.emitWeb('chat:display', true);
    Chat.focusState = true;
    SetNuiFocus(true, true);
  }
  private static verifyMessageOnServer(content: string) {
    
    // Wyślij event do servera, server niech odbierze, niech sprawdzi z konfiguracji czy wszystko git, niech odesle id z contentem a addMessage niech przejmie to i wysle do web.
  }
  //addMessage jest po weryfikacji z servera czy wszystko git.
  static addMessage(content: string, serverGeneratedId: number) {
    if (!content) {
      console.error(`[addMessage]: Content not provided!`);
      return;
    }
    const newMessage = Chat.generateMessage(content, serverGeneratedId);
    if (!newMessage) return;
    Chat.buffer.push(newMessage);
    Chat.instance.emitWeb('chat:addMessage', newMessage);
  }
  private static generateMessage(content: string, serverMessageId: number): GeneratedMessage | undefined {
    if (!content) {
      console.error(`[generateMessage]: Content not provided!`);
      return;
    }
    const isRequirementsFilled = Chat.checkMessageRequirements(content);
    if (!isRequirementsFilled) return;
    if (Chat.buffer.length >= CHAT_CONFIG.MAX_ITEMS) {
      Chat.buffer.splice(0, 1);
    }
    return { content, id: serverMessageId };
  }
  private static checkMessageRequirements(content: string) {
    if (!content) {
      console.error('[checkMessageRequirements]: Content not provided');
      return;
    }
    if (!Chat.rules) {
      console.warn('[checkMessageRequirements]: You dont provided any rules for chat! Change it ASAP');
      return true;
    }
    if (typeof content === 'object' || Array.isArray(content)) {
      return;
    } else {
      if (typeof content === 'number') {
        content = `${content}`;
      }
    }
    if (!Chat.rules.MESSAGE_CFG.canBeEmpty) {
      content = content.trim();
    }
    if (content.length < Chat.rules.MESSAGE_CFG.MIN_LENGTH || content.length > Chat.rules.MESSAGE_CFG.MAX_LENGTH) {
      console.warn('[checkMessageRequirements]: Message too long!');
      return false;
    }
    return true;
  }
}
