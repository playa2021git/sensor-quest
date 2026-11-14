// Original teaching statements; no student identifiers or quotations are stored.
export const BASIC_PASS_SCORE = 7;
export const basicQuestions = [
  {
    "id": "b1",
    "title": "人感センサの見ている範囲",
    "sensor": "PIR人感センサ",
    "tile": 0,
    "answer": false,
    "statement": "人感センサは、白いカバーの正面の細い線上だけを調べている。",
    "explanation": "白いカバーは、周囲から届く赤外線を集めるレンズです。正面の一点ではなく、左右にも広がった範囲の変化に反応します。横を通る人にも反応するため、指先だけの細かい動作を見分ける道具ではありません。",
    "note": "検知範囲は機種・レンズ・設置条件で異なります。図は広がりを示す模式図で、特定の角度・距離を保証しません。PIRは光を発射しません。",
    "diagram": true
  },
  {
    "id": "b2",
    "title": "人感センサと動物",
    "sensor": "PIR人感センサ",
    "tile": 1,
    "answer": true,
    "statement": "人感センサは、人だけでなく犬や猫の動きにも反応することがある。",
    "explanation": "人間という種類を見分けているのではありません。周囲から届く赤外線量の変化に反応するので、犬や猫にも反応することがあります。",
    "note": "動物の大きさ・位置・温度差などで反応は変わります。すべての動物を必ず検知するわけではありません。",
    "image": "assets/basic-revisions.png",
    "imageColumns": 3,
    "imageRows": 1,
    "imageTile": 0
  },
  {
    "id": "b3",
    "title": "動きと行動は別",
    "sensor": "PIR人感センサ",
    "tile": 2,
    "answer": false,
    "statement": "人感センサが反応しただけで、その人が勉強中か寝ているか分かる。",
    "explanation": "得られるのは赤外線量の変化に対する反応です。勉強・睡眠・施錠などの行動の内容や状態は、それだけでは判定できません。",
    "note": "反応がないことも「寝ている」「人がいない」という証明にはなりません。PIRは赤外線を受け取るセンサで、端子から光を出すものではありません。",
    "image": "assets/basic-revisions.png",
    "imageColumns": 3,
    "imageRows": 1,
    "imageTile": 1
  },
  {
    "id": "b4",
    "title": "加速度とスピード",
    "sensor": "加速度センサ（内蔵）",
    "tile": 3,
    "answer": false,
    "statement": "加速度センサの値から、瞬時の速度をそのまま割り出すことができる。",
    "explanation": "加速度と速度は別の量です。ある瞬間の加速度の値だけでは、その瞬間の速度は分かりません。速度を推定するには、初めの速度や向きなどを考慮して、時間ごとの値を計算する必要があります。",
    "note": "一定の速さで動いていても、その速さ自体がセンサから直接出るわけではありません。計算では誤差も蓄積します。"
  },
  {
    "id": "b5",
    "title": "明るさを手がかりに",
    "sensor": "明るさセンサ",
    "tile": 4,
    "answer": true,
    "statement": "明るさセンサは、物が光を遮る置き方なら、物の有無を調べる手がかりにできる。",
    "explanation": "測るのは光の量です。物を置くと暗くなる配置なら、値の変化を物の有無の手がかりにできます。ただし、物の種類や材質までは分かりません。",
    "note": "照明や影が変わっても値は変化します。置き方や周囲の光の調整が必要です。"
  },
  {
    "id": "b6",
    "title": "教室の窓からボールを測れる？",
    "sensor": "超音波距離センサ",
    "tile": 5,
    "answer": false,
    "statement": "教室の窓に付けた超音波距離センサで、何十mも離れたグラウンドのボールまでの距離を測れる。",
    "explanation": "授業でよく使う超音波距離センサには、測定範囲が約2〜400cm（約4m）のものがあります。何十mも離れたグラウンドのボールは範囲外です。音を出せばどこまでも測れるわけではありません。",
    "note": "約2〜400cmはHC-SR04などの仕様の一例で、全機種共通ではありません。小さな球面・角度・材質などによって、範囲内でも測れない場合があります。",
    "image": "assets/basic-revisions.png",
    "imageColumns": 3,
    "imageRows": 1,
    "imageTile": 2
  },
  {
    "id": "b7",
    "title": "micro:bitで体温測定？",
    "sensor": "温度センサ（内蔵）",
    "tile": 6,
    "answer": false,
    "statement": "micro:bitの内蔵温度センサがあれば、人間の体温も正確に測れる。",
    "explanation": "micro:bitはプロセッサの温度を利用して、基板付近の温度を推定します。人の体温を正確に測るための医療用体温計ではありません。",
    "note": "本体の発熱や測り方の影響を受けます。手で触れた値をそのまま体温として使うことはできません。"
  },
  {
    "id": "b8",
    "title": "入力と出力",
    "sensor": "マイク／スピーカー",
    "tile": 7,
    "answer": true,
    "statement": "周囲の音を受け取るマイクは入力、音を鳴らすスピーカーは出力である。",
    "explanation": "マイクは周囲の音を情報として取り込みます。スピーカーはプログラムの指示に応じて音を出します。「受け取る」と「伝える」は別の役割です。",
    "note": "マイクが音を受け取ることと、言葉の意味を理解する処理も別です。"
  },
  {
    "id": "b9",
    "title": "現在時刻と経過時間",
    "sensor": "micro:bitと時計",
    "tile": 8,
    "answer": false,
    "statement": "micro:bitには、電源を切っても現在時刻を保つ時計ユニットRTCが標準搭載されているので、本体だけですぐデジタル腕時計になる。",
    "explanation": "micro:bit本体には、電源を切っても日付や現在時刻を保持する電池付き時計ユニットは標準搭載されていません。一方、「ボタンを押してから何秒後」などの経過時間を使うプログラムは作れます。",
    "note": "現在時刻を使うには時刻合わせや外部RTCなどの工夫が必要です。3600秒後の処理は、テスト時に短い待ち時間へ変えると確かめやすくなります。"
  },
  {
    "id": "b10",
    "title": "AIカメラは万能？",
    "sensor": "AIカメラ（画像認識）",
    "tile": 9,
    "answer": true,
    "statement": "AIカメラの判定は、学習した画像や撮影条件によって間違うことがある。",
    "explanation": "照明・角度・隠れ方・学習画像の偏りなどで誤分類します。顔や姿勢が映っても、その人の本当の意図や不正行為、体調まで確実に判断できるわけではありません。",
    "note": "AIの分類結果と、本当に起きていることを区別し、実際の環境で確かめる必要があります。"
  }
];
export function basicScore(answers) {
  return basicQuestions.reduce((total,q,i) => total + (typeof answers[i] === 'boolean' && answers[i] === q.answer ? 1 : 0), 0);
}
