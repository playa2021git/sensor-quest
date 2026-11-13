// The allowed IDs match reinvent-device-guide/js/devices.js (checked 2026-11-13).
export const devices = [
  { id:'buttons', name:'micro:bit A・Bボタン', category:'input', information:'ボタンを押した操作', unknown:'本人の身元や操作後の状態', example:'給水の要求、確認の開始、目覚まし停止', limitation:'押す意思を受け取る約束として使う。単なるボタンは本人認証ではない。' },
  { id:'touch', name:'micro:bit タッチロゴ', category:'input', information:'金色のロゴに触れたこと', unknown:'触れた人の身元や周囲の距離', example:'触れて開始する操作', limitation:'micro:bit V2の機能。手袋・水分・接触の状態によって扱いやすさが変わる。' },
  { id:'light', name:'明るさセンサ', category:'input', information:'LED表示部で検出する周囲の明るさ', unknown:'人の接近や物の種類', example:'暗いときの自動照明', limitation:'影・設置方向・本体の表示の影響に注意。動きは別の入力で調べる。' },
  { id:'temperature', name:'温度センサ', category:'input', information:'micro:bitの基板付近の温度', unknown:'離れた機械の正確な温度や音の種類', example:'周囲の温度変化の記録', limitation:'プロセッサの温度を使った推定。環境温度とずれる場合があり、精密な室温計ではない。' },
  { id:'microphone', name:'micro:bit内蔵マイク', category:'input', information:'周囲の音の大きさ（相対値）', unknown:'音量の値だけでは話の内容や音の種類', example:'大きな音が出たときの通知', limitation:'V2の機能。音量のしきい値を決めて使う。校正した騒音計のdB値ではなく、距離・騒音の影響を受ける。' },
  { id:'accelerometer', name:'加速度センサ', category:'input', information:'各軸の加速度。重力の影響も含む', unknown:'速度や移動距離を直接測るわけではない', example:'静止に近い状態の傾き推定、歩行の周期から歩数を推定', limitation:'傾きは重力の方向からプログラムで推定。動かすと運動の加速度も混ざる。速度推定には計算・初期条件が必要で誤差も蓄積する。' },
  { id:'compass', name:'コンパス／磁気センサ', category:'input', information:'磁場の強さ・向き', unknown:'重力の向きや対象までの距離', example:'方位の推定、磁石への反応', limitation:'校正が必要。金属や磁石の近くで影響を受ける。方位と画面の縦横は別の情報。' },
  { id:'pir', name:'人感センサ', category:'input', information:'視野内の赤外線量の変化に対する反応', unknown:'人間だけの識別、正確な距離、睡眠状態', example:'通路の動きをきっかけに点灯', limitation:'動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。' },
  { id:'soil', name:'土壌水分センサ', category:'input', information:'土の電気的特性を使った水分の手がかり', unknown:'空気の湿度や植物の健康そのもの', example:'土が乾いたときの水やり', limitation:'土の種類・塩分・設置場所で値が変わる。実際の土で校正し、方式によって腐食にも注意。' },
  { id:'distance', name:'超音波距離センサ', category:'input', information:'超音波の往復時間から求める対象までの距離', unknown:'対象の名前・意思・確実な本人識別', example:'近距離の壁までの測距', limitation:'斜面、細い物、柔らかい物、検知範囲外は苦手。模型用で実車の安全装置ではない。接続時は電圧の適合を確認する。' },
  { id:'scale', name:'重量センサ', category:'input', information:'荷重。校正して重さに換算', unknown:'物の種類、本人の識別、睡眠状態', example:'水皿の残量、在床、荷物の有無', limitation:'容器・寝具の重さを差し引く。振動、偏った荷重、他の物や動物が触れた重さにも反応する。' },
  { id:'ai-image', name:'AI画像認識', category:'ai', information:'カメラ画像を学習済みモデルが分類した結果', unknown:'見えない物や未学習の状態、確実な本人認証、直接のcm測距', example:'Teachable Machine画像プロジェクトで猫・犬やつまみの向きを分類', limitation:'背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。' },
  { id:'ai-sound', name:'AI音認識', category:'ai', information:'マイク音声を学習済みモデルが分類した結果', unknown:'未知の異常の確実な検知や故障の確定診断', example:'Teachable Machine音声プロジェクトで正常音・異常音・背景音を分類', limitation:'音量だけの検知と異なる。騒音や録音条件、未知の音で誤分類。Chromebook等との連携が必要。' },
  { id:'ai-pose', name:'AIポーズ認識', category:'ai', information:'カメラから推定した体のポーズをモデルが分類した結果', unknown:'本人の意思や身元、睡眠状態、機械の音', example:'Teachable Machineポーズプロジェクトで手上げ・しゃがむ姿勢を分類', limitation:'体が画面外、隠れ、撮影角度などで誤判定。Chromebook等で実行し、micro:bit単体では動かない。' },
  { id:'led', name:'micro:bit 5×5 LED', category:'output', information:'光・記号・数値を表示する出力', unknown:'表示する機能だけでは周囲の状態は測らない', example:'結果や注意を表示', limitation:'同じLED部に明るさを検出する別の機能もある。表示する役割と入力の役割を分けて考える。' },
  { id:'speaker', name:'micro:bit内蔵スピーカー', category:'output', information:'音を出す出力', unknown:'周囲の音の入力ではない', example:'注意音や目覚まし', limitation:'音を拾う役割はマイク。V2の内蔵機能。周囲に聞こえる音量に配慮する。' },
  { id:'servo', name:'180°サーボモータ SG90', category:'output', information:'指定した角度へ動かす出力', unknown:'本人認証や荷物の有無', example:'授業用模型のふたを動かす', limitation:'実用の施錠性能を保証しない。角度・負荷・電源を確認する。' },
  { id:'vibrator', name:'振動モータ', category:'output', information:'振動で知らせる出力', unknown:'周囲の揺れの測定ではない', example:'静かな通知', limitation:'揺れを入力する加速度センサと役割が異なる。取り付けや振動の伝わり方に注意。' },
  { id:'pump', name:'デジタルマイクロポンプ', category:'output', information:'水や空気を送る出力', unknown:'水の残量や猫の種類', example:'授業用自動給水の動作模型', limitation:'残量は別の入力で調べる。水と電子回路を離し、実機で通電時間や流量を確認する。' }
];
export const inputIds = devices.filter(d => d.category !== 'output').map(d => d.id);
export const outputIds = devices.filter(d => d.category === 'output').map(d => d.id);
