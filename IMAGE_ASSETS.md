# 問題画像の配置

すべて生成画像。新シートは実写風で、実在商品写真ではありません。2列×3行の等分シートをCSSで表示し、下段右は未使用です。正解のセンサや配線を描かず、場面を中心にしています。

| 問 | シート | セル（0始まり） |
|---|---|---|
| 1 学校の冷水機 | assets/scenes-v3-stage1.png | 0 |
| 2 車の駐車支援 | assets/stage1-scenes.png | 1 |
| 3 学校の階段の自動ライト | assets/scenes-v3-stage1.png | 2 |
| 4 スマホの画面の自動回転 | assets/scenes-v3-stage1.png | 3 |
| 5 スマートウォッチの歩数計 | assets/scenes-v3-stage1.png | 4 |
| 6 図書館の静かにお知らせ | assets/scenes-v3-stage2.png | 0 |
| 7 老猫のごはんを守ろう | assets/scenes-v3-stage2.png | 1 |
| 8 玄関の鍵、かけたかな？ | assets/scenes-v3-stage2.png | 2 |
| 9 勉強中のスマホ注意係 | assets/scenes-v3-stage2.png | 3 |
| 10 置き配の持ち去りお知らせ | assets/scenes-v3-stage2.png | 4 |

第2問だけは従来のstage1-scenes.pngの上段右をそのまま使用します。旧stage2-scenes.pngは問題では参照しません。案内猫は透過背景のcat-worksite.png（3列×2行）を使用します。素朴な線と力の抜けた表情、黒い作業服上下、緑十字と「安全第一」の黄色いヘルメットが特徴のオリジナルキャラクターです。

## 差し替え

src/assets.jsのsceneReplacementsにq1などをキーに個別画像の相対パスを設定できます。個別画像が欠損したら当該問題のシートへ戻り、シートも欠損したら状況の説明文を表示して回答を続けられます。catReplacementsで案内猫も差し替えできます。

冷水機は人・指のない上半分、階段は夕方の校内、端末は動画画面風、歩数計は屋外の生徒と4000歩表示、猫は若い犬に餌を食べられる場面です。学校名や個人名は含みません。実際の商品の写真へ置き換える場合は利用許諾のある素材を使います。
