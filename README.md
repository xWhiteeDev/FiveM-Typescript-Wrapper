# 🐌FiveM Typescript wrapper
<div align="center">
<img src="https://raw.githubusercontent.com/xWhiteeDev/FiveM-Typescript-Wrapper/main/assets/fivexts.png" width="20%" />
</div>
A simplified fan-made typescript wrapper for FiveM
As a TypeScript user when i switched to FiveM it was so annoying to write JavaScript like lua code... I can't imagine working without object-oriented programming - So from that moment i decided to create my own wrapper
to make my eyes happier and my code much easier to understand.

## Great! How can i use it?

1. At first you need install this npm module like below.
```bash
 npm install fivem-typescript
 ```
2. Before you will execute 3 things - Important to work.
```ts
import {Player} from "fivem-typescript/server"
new Player(source) // Note: Source have to be string
```
```ts
import {CFX,Player} from "fivem-typescript/server"
CFX.init(Player.get) // Note: Important to working CFX.addEvent methods because inside, handler receives player by Player.get(source)
```
```ts 
 import {LocalPlayer} from "fivem-typescript/client" 
 LocalPlayer.initEvents() // Note: Important to work events properly. 
 ```
3. After that just import something to your code like below:
 ```ts
 import {CFX} from "fivem-typescript/server"
 CFX.addCrossEventListener("mySuperCrossEventName", myExtraHandler)
 ```
## Example
 ```ts
 import { CFX, Player } from 'fivem-typescript/server';
CFX.init(Player.get);

const model: string = 'mp_m_freemode_01';
const coords = { x: 0, y: 0, z: 72 };
function playerJoining() {
  const src = source;
  const player = new Player(String(src)); //Note: Not always source is string so it's worth to convert it into.
  player.spawn(model, coords);
}

on('playerJoining', playerJoining);

function playerSpawned(player: Player) {
  console.log(`Player: ${player.name} spawned!`);
  player.giveWeapon(0x5ef9fec4, 200, { bForceInHand: true, isHidden: false });
}
CFX.addEventListener('playerSpawned', playerSpawned);
```
## ❗Important thing
Guys remember it's V 1.0 I'll be making changes. so please be patient — I'm working on giving you a proper first stable version
