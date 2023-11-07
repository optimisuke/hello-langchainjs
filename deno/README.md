# deno で試してみる

これを見て、いい感じにできそうな気がしたけど、うまく動かない。
[langchainjs と deno を使って typescript で ChatGPT API を利用する #Deno - Qiita](https://qiita.com/peka2/items/f15dc0d998a1c7ce53e5)

```
(3) ~/Private/hello-langchainjs/deno on main [!] took 4s
1 % deno run --reload index.ts
error: Error getting response at https://registry.npmjs.org/@types/node-fetch for package "@types/node-fetch": error sending request for url (https://registry.npmjs.org/@types/node-fetch): connection error: unexpected end of file: connection error: unexpected end of file: unexpected end of file

(3) ~/Private/hello-langchainjs/deno on main [!] took 5s
1 % deno cache --reload index.ts
error: Error getting response at https://registry.npmjs.org/digest-fetch for package "digest-fetch": error sending request for url (https://registry.npmjs.org/digest-fetch): connection error: unexpected end of file: connection error: unexpected end of file: unexpected end of file
```
