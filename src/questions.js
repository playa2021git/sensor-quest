export const questions = [
  {
    "id": "q1",
    "stage": 1,
    "title": "学校の冷水機",
    "scenario": "飲みたい人が合図したときだけ、水を出そう。",
    "requirements": "冷水機の前を、水を飲まない人も通り過ぎる。素手で操作でき、簡単に要求を伝えたい。",
    "image": "assets/scenes-v3-stage1.png",
    "sceneSheet": "v3stage1",
    "sceneTile": 0,
    "imageAlt": "学校に置かれた冷水機の上部。人や手は写っていない。",
    "choices": [
      {
        "id": "best",
        "label": "A・Bボタン",
        "devices": [
          "buttons"
        ],
        "evaluation": "optimal",
        "information": "ボタンを押した操作",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "押す意思を受け取る約束として使う。単なるボタンは本人認証ではない。",
        "explanation": "「押すと給水」と決めれば、本人が要求を直接伝えられます。通り過ぎただけでは水を出しません。"
      },
      {
        "id": "c0",
        "label": "micro:bitのタッチロゴ",
        "devices": [
          "touch"
        ],
        "evaluation": "optimal",
        "information": "金色のロゴに触れたこと",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "micro:bit V2の機能。手袋・水分・接触の状態によって扱いやすさが変わる。",
        "explanation": "micro:bit V2の金色のロゴに触れる操作でも給水を要求できます。スマホの画面ではなく、接触を検知する入力です。"
      },
      {
        "id": "c1",
        "label": "AI音認識（「みず」の合図）",
        "devices": [
          "ai-sound"
        ],
        "evaluation": "possible",
        "information": "マイク音声を学習済みモデルが分類した結果",
        "strength": "条件と配置を調整すれば、間接的な手がかりを得られる。",
        "limitations": "音量だけの検知と異なる。騒音や録音条件、未知の音で誤分類。Chromebook等との連携が必要。",
        "explanation": "合図を学習すれば給水できます。ただし、周囲の声や騒音で誤認識することがあり、学習と調整が必要です。"
      },
      {
        "id": "c2",
        "label": "人感センサ",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "視野内の赤外線量の変化に対する反応",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。",
        "explanation": "通り過ぎる人などにも反応します。給水を要求したかどうかは分かりません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "ボタンを押す操作も、micro:bit V2のタッチロゴに触れる操作も、給水の要求を直接伝えられます。今回は素手で操作できるので、どちらも最適です。タッチは手袋や水分の影響を受けます。",
    "limitations": "押す意思を受け取る約束として使う。単なるボタンは本人認証ではない。",
    "learningPoint": "本人の操作と、近くにいることは別。ボタンもタッチロゴも要求を伝える入力。",
    "misconception": "人の接近だけで、飲みたい意思が分かる。",
    "outputs": [
      "pump"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  },
  {
    "id": "q2",
    "stage": 1,
    "title": "車の駐車支援",
    "scenario": "バックするとき、壁まで何cmか知らせよう。",
    "requirements": "運転席から後ろの壁との間隔が見えない。仕組みを試す模型で、近くの平らな壁まで測る。",
    "image": "assets/stage1-scenes.png",
    "sceneSheet": "stage1",
    "sceneTile": 1,
    "imageAlt": "後ろの壁との間隔が狭い、駐車中の車。",
    "choices": [
      {
        "id": "best",
        "label": "超音波距離センサ",
        "devices": [
          "distance"
        ],
        "evaluation": "optimal",
        "information": "超音波の往復時間から求める対象までの距離",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "斜面、細い物、柔らかい物、検知範囲外は苦手。模型用で実車の安全装置ではない。接続時は電圧の適合を確認する。",
        "explanation": "音が壁に当たって戻るまでの時間から距離を求めます。山びこと同じ反射を使う仕組みです。実車の安全装置を保証するものではありません。"
      },
      {
        "id": "c0",
        "label": "AIカメラ（画像認識）",
        "devices": [
          "ai-image"
        ],
        "evaluation": "unsuitable",
        "information": "カメラ画像を学習済みモデルが分類した結果",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。",
        "explanation": "今回の画像分類では、壁が映っていると分類しても、何cm離れているかの数値は得られません。"
      },
      {
        "id": "c1",
        "label": "人感センサ",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "視野内の赤外線量の変化に対する反応",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。",
        "explanation": "赤外線量の変化に反応する入力で、静止した壁までの距離は測れません。"
      },
      {
        "id": "c2",
        "label": "加速度センサ",
        "devices": [
          "accelerometer"
        ],
        "evaluation": "unsuitable",
        "information": "各軸の加速度。重力の影響も含む",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "傾きは重力の方向からプログラムで推定。動かすと運動の加速度も混ざる。速度推定には計算・初期条件が必要で誤差も蓄積する。",
        "explanation": "車体の加速度は測れても、壁の位置は分かりません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "音が壁に当たって戻るまでの時間から距離を求めます。山びこと同じ反射を使う仕組みです。実車の安全装置を保証するものではありません。",
    "limitations": "斜面、細い物、柔らかい物、検知範囲外は苦手。模型用で実車の安全装置ではない。接続時は電圧の適合を確認する。",
    "learningPoint": "物の見た目を分類することと、距離を数値で測ることは別。",
    "misconception": "AI画像分類だけで何cmかを測れる。",
    "outputs": [
      "led",
      "speaker"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  },
  {
    "id": "q3",
    "stage": 1,
    "title": "学校の階段の自動ライト",
    "scenario": "暗いときに人が通ったら、階段のライトをつけよう。",
    "requirements": "夕方の学校の階段。明るい時間や、誰も通らない時間の点灯を減らしたい。",
    "image": "assets/scenes-v3-stage1.png",
    "sceneSheet": "v3stage1",
    "sceneTile": 2,
    "imageAlt": "夕方の光が窓から入る、学校の階段と踊り場。",
    "choices": [
      {
        "id": "best",
        "label": "明るさセンサ＋人感センサ",
        "devices": [
          "light",
          "pir"
        ],
        "evaluation": "optimal",
        "information": "LED表示部で検出する周囲の明るさ／視野内の赤外線量の変化に対する反応",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "影・設置方向・本体の表示の影響に注意。動きは別の入力で調べる。 動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。",
        "explanation": "明るさで暗いかを調べ、人感センサで動きの手がかりを得ます。両方の条件がそろったときに点灯できます。"
      },
      {
        "id": "c0",
        "label": "明るさセンサ＋超音波距離センサ",
        "devices": [
          "light",
          "distance"
        ],
        "evaluation": "possible",
        "information": "LED表示部で検出する周囲の明るさ／超音波の往復時間から求める対象までの距離",
        "strength": "条件と配置を調整すれば、間接的な手がかりを得られる。",
        "limitations": "影・設置方向・本体の表示の影響に注意。動きは別の入力で調べる。 斜面、細い物、柔らかい物、検知範囲外は苦手。模型用で実車の安全装置ではない。接続時は電圧の適合を確認する。",
        "explanation": "人が通ると測定距離が変わる配置なら実現できます。ただし、階段や壁の形に合わせて取付位置と検出範囲を調整する必要があります。"
      },
      {
        "id": "c1",
        "label": "人感センサだけ",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "視野内の赤外線量の変化に対する反応",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。",
        "explanation": "動きには反応しますが、明るい昼か暗い夕方かを判断できません。"
      },
      {
        "id": "c2",
        "label": "明るさセンサだけ",
        "devices": [
          "light"
        ],
        "evaluation": "unsuitable",
        "information": "LED表示部で検出する周囲の明るさ",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "影・設置方向・本体の表示の影響に注意。動きは別の入力で調べる。",
        "explanation": "暗さは分かりますが、人が通っていないときにも点灯してしまいます。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "明るさで暗いかを調べ、人感センサで動きの手がかりを得ます。両方の条件がそろったときに点灯できます。",
    "limitations": "影・設置方向・本体の表示の影響に注意。動きは別の入力で調べる。 動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。",
    "learningPoint": "「暗い」かつ「動きがある」をAND条件で判断しよう。",
    "misconception": "人感センサだけで、暗さも人の種類も分かる。",
    "outputs": [
      "led"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  },
  {
    "id": "q4",
    "stage": 1,
    "title": "スマホの画面の自動回転",
    "scenario": "端末を横に回したら、表示も自動で横向きにしよう。",
    "requirements": "立った姿勢で画面を顔へ向け、端末をゆっくり回す。ボタンを押さずに切り替えたい。",
    "image": "assets/scenes-v3-stage1.png",
    "sceneSheet": "v3stage1",
    "sceneTile": 3,
    "imageAlt": "縦向きと横向きの端末に、動画プレーヤー風の画面が表示されている。",
    "choices": [
      {
        "id": "best",
        "label": "加速度センサ",
        "devices": [
          "accelerometer"
        ],
        "evaluation": "optimal",
        "information": "各軸の加速度。重力の影響も含む",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "傾きは重力の方向からプログラムで推定。動かすと運動の加速度も混ざる。速度推定には計算・初期条件が必要で誤差も蓄積する。",
        "explanation": "重力が各軸にかかる方向から、端末の傾きを推定できます。その値を使ってプログラムが表示を切り替えます。"
      },
      {
        "id": "c0",
        "label": "コンパス",
        "devices": [
          "compass"
        ],
        "evaluation": "unsuitable",
        "information": "磁場の強さ・向き",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "校正が必要。金属や磁石の近くで影響を受ける。方位と画面の縦横は別の情報。",
        "explanation": "磁場から方位を推定する入力です。今回の重力に対する縦横の判定には適しません。"
      },
      {
        "id": "c1",
        "label": "明るさセンサ",
        "devices": [
          "light"
        ],
        "evaluation": "unsuitable",
        "information": "LED表示部で検出する周囲の明るさ",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "影・設置方向・本体の表示の影響に注意。動きは別の入力で調べる。",
        "explanation": "周囲の明るさから、端末の縦横は分かりません。"
      },
      {
        "id": "c2",
        "label": "A・Bボタン",
        "devices": [
          "buttons"
        ],
        "evaluation": "unsuitable",
        "information": "ボタンを押した操作",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "押す意思を受け取る約束として使う。単なるボタンは本人認証ではない。",
        "explanation": "手動の切替ならできますが、端末を回すだけで自動判定する条件を満たしません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "重力が各軸にかかる方向から、端末の傾きを推定できます。その値を使ってプログラムが表示を切り替えます。",
    "limitations": "傾きは重力の方向からプログラムで推定。動かすと運動の加速度も混ざる。速度推定には計算・初期条件が必要で誤差も蓄積する。",
    "learningPoint": "重力を含む測定値から、プログラムが姿勢を推定する。",
    "misconception": "加速度センサが、画面の縦横を直接読み取る。",
    "outputs": [
      "led"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  },
  {
    "id": "q5",
    "stage": 1,
    "title": "スマートウォッチの歩数計",
    "scenario": "1日に歩いた歩数を、どうやって数えている？",
    "requirements": "外を歩いてきた生徒が、腕時計の「4000歩」を確認している。歩く動きを自動で数えたい。",
    "image": "assets/scenes-v3-stage1.png",
    "sceneSheet": "v3stage1",
    "sceneTile": 4,
    "imageAlt": "屋外の中学生が自然に手首を上げ、4000歩と表示されたスマートウォッチを見ている。",
    "choices": [
      {
        "id": "best",
        "label": "加速度センサ",
        "devices": [
          "accelerometer"
        ],
        "evaluation": "optimal",
        "information": "各軸の加速度。重力の影響も含む",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "傾きは重力の方向からプログラムで推定。動かすと運動の加速度も混ざる。速度推定には計算・初期条件が必要で誤差も蓄積する。",
        "explanation": "歩くときの周期的な揺れや加速度の変化をプログラムで調べ、歩数を推定します。腕振りなどで数え間違えることもあります。"
      },
      {
        "id": "c0",
        "label": "内蔵マイク（音量）",
        "devices": [
          "microphone"
        ],
        "evaluation": "unsuitable",
        "information": "周囲の音の大きさ（相対値）",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "V2の機能。音量のしきい値を決めて使う。校正した騒音計のdB値ではなく、距離・騒音の影響を受ける。",
        "explanation": "足音以外の音も拾い、静かな足音を聞き逃すこともあります。音量だけで歩数を安定して数えることはできません。"
      },
      {
        "id": "c1",
        "label": "明るさセンサ",
        "devices": [
          "light"
        ],
        "evaluation": "unsuitable",
        "information": "LED表示部で検出する周囲の明るさ",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "影・設置方向・本体の表示の影響に注意。動きは別の入力で調べる。",
        "explanation": "明るさの変化は一歩ずつの動きと対応しません。"
      },
      {
        "id": "c2",
        "label": "A・Bボタン",
        "devices": [
          "buttons"
        ],
        "evaluation": "unsuitable",
        "information": "ボタンを押した操作",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "押す意思を受け取る約束として使う。単なるボタンは本人認証ではない。",
        "explanation": "一歩ごとに押せば手動で数えられますが、歩く動きを自動で数える仕組みにはなりません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "歩くときの周期的な揺れや加速度の変化をプログラムで調べ、歩数を推定します。腕振りなどで数え間違えることもあります。",
    "limitations": "傾きは重力の方向からプログラムで推定。動かすと運動の加速度も混ざる。速度推定には計算・初期条件が必要で誤差も蓄積する。",
    "learningPoint": "歩数は歩くときの周期的な加速度から推定する。センサが歩数そのものを測るわけではない。",
    "misconception": "腕が動く回数は必ず歩数と一致する。",
    "outputs": [
      "led"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  },
  {
    "id": "q6",
    "stage": 2,
    "title": "図書館の静かにお知らせ",
    "scenario": "図書館で騒がしくなったら、自動で注意音を鳴らそう。",
    "requirements": "話し声が大きくても本人たちは気づかない。決めた音量を超えたときだけ、短い注意音で知らせたい。",
    "image": "assets/scenes-v3-stage2.png",
    "sceneSheet": "v3stage2",
    "sceneTile": 0,
    "imageAlt": "図書館の机で話し声が大きくなり、近くの読書中の生徒が困っている。",
    "choices": [
      {
        "id": "best",
        "label": "内蔵マイク（音量）",
        "devices": [
          "microphone"
        ],
        "evaluation": "optimal",
        "information": "周囲の音の大きさ（相対値）",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "V2の機能。音量のしきい値を決めて使う。校正した騒音計のdB値ではなく、距離・騒音の影響を受ける。",
        "explanation": "周囲の音量を基準と比べて、超えたら短く知らせます。自分の注意音で鳴り続けないよう、鳴らした直後は判定を休む工夫も必要です。"
      },
      {
        "id": "c0",
        "label": "人感センサ",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "視野内の赤外線量の変化に対する反応",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。",
        "explanation": "静かに歩く人にも反応し、音の大きさは分かりません。"
      },
      {
        "id": "c1",
        "label": "AIカメラ（画像認識）",
        "devices": [
          "ai-image"
        ],
        "evaluation": "unsuitable",
        "information": "カメラ画像を学習済みモデルが分類した結果",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。",
        "explanation": "口が開いている見た目だけでは、声の大きさは測れません。"
      },
      {
        "id": "c2",
        "label": "温度センサ",
        "devices": [
          "temperature"
        ],
        "evaluation": "unsuitable",
        "information": "micro:bitの基板付近の温度",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "プロセッサの温度を使った推定。環境温度とずれる場合があり、精密な室温計ではない。",
        "explanation": "温度と、その場の話し声の大きさは別の情報です。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "周囲の音量を基準と比べて、超えたら短く知らせます。自分の注意音で鳴り続けないよう、鳴らした直後は判定を休む工夫も必要です。",
    "limitations": "V2の機能。音量のしきい値を決めて使う。校正した騒音計のdB値ではなく、距離・騒音の影響を受ける。",
    "learningPoint": "音の大きさと、何の音かという種類は別の情報。",
    "misconception": "人の動きや口の見た目から音量を測れる。",
    "outputs": [
      "speaker"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  },
  {
    "id": "q7",
    "stage": 2,
    "title": "老猫のごはんを守ろう",
    "scenario": "猫が来たときだけ、ごはん箱のフタを開けよう。",
    "requirements": "犬と猫を飼う家。食欲旺盛な若い犬が、老猫のごはんまで食べてしまう。鳴かずに近づくときもある。",
    "image": "assets/scenes-v3-stage2.png",
    "sceneSheet": "v3stage2",
    "sceneTile": 1,
    "imageAlt": "おなかをすかせた老猫の横で、若い子犬が猫の皿のごはんを食べている。",
    "choices": [
      {
        "id": "best",
        "label": "AIカメラ（画像認識）",
        "devices": [
          "ai-image"
        ],
        "evaluation": "optimal",
        "information": "カメラ画像を学習済みモデルが分類した結果",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。",
        "explanation": "この家の猫と犬の画像を学習し、猫と分類したときだけフタを開ける案です。照明や姿勢、隠れで誤分類するため、実際の場面で確認します。"
      },
      {
        "id": "c0",
        "label": "AIマイク（鳴き声の認識）",
        "devices": [
          "ai-sound"
        ],
        "evaluation": "unsuitable",
        "information": "マイク音声を学習済みモデルが分類した結果",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "音量だけの検知と異なる。騒音や録音条件、未知の音で誤分類。Chromebook等との連携が必要。",
        "explanation": "鳴き声を分類できても、鳴かずに来た猫は検出できません。"
      },
      {
        "id": "c1",
        "label": "人感センサ",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "視野内の赤外線量の変化に対する反応",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。",
        "explanation": "犬にも猫にも反応しうるため、猫だけを区別できません。"
      },
      {
        "id": "c2",
        "label": "加速度センサ",
        "devices": [
          "accelerometer"
        ],
        "evaluation": "unsuitable",
        "information": "各軸の加速度。重力の影響も含む",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "傾きは重力の方向からプログラムで推定。動かすと運動の加速度も混ざる。速度推定には計算・初期条件が必要で誤差も蓄積する。",
        "explanation": "取り付けた物の揺れや傾きは測れますが、来た動物の種類は分かりません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "この家の猫と犬の画像を学習し、猫と分類したときだけフタを開ける案です。照明や姿勢、隠れで誤分類するため、実際の場面で確認します。",
    "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。",
    "learningPoint": "欲しい情報は動物の種類。存在や動きだけでは区別できない。",
    "misconception": "動物の存在を検知すれば、猫か犬か分かる。",
    "outputs": [
      "servo"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  },
  {
    "id": "q8",
    "stage": 2,
    "title": "玄関の鍵、かけたかな？",
    "scenario": "2階の自室から、玄関の鍵をかけたか確かめよう。",
    "requirements": "室内側のつまみが90度回る錠。つまみに装置を付けず、明るい玄関の今の様子を画像でも確認したい。",
    "image": "assets/scenes-v3-stage2.png",
    "sceneSheet": "v3stage2",
    "sceneTile": 2,
    "imageAlt": "玄関のドア内側にある、横向きのサムターン。鍵や追加の装置は付いていない。",
    "choices": [
      {
        "id": "best",
        "label": "AIカメラ（つまみの向きを分類）",
        "devices": [
          "ai-image"
        ],
        "evaluation": "optimal",
        "information": "カメラ画像を学習済みモデルが分類した結果",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。",
        "explanation": "室内側のサムターンの施錠・解錠時の向きを学習します。今の画像も確認できる方法です。実際の向きとの対応を確認し、見えない・暗い場合は「不明」とします。"
      },
      {
        "id": "c0",
        "label": "加速度センサ（つまみに固定）",
        "devices": [
          "accelerometer"
        ],
        "evaluation": "possible",
        "information": "各軸の加速度。重力の影響も含む",
        "strength": "条件と配置を調整すれば、間接的な手がかりを得られる。",
        "limitations": "傾きは重力の方向からプログラムで推定。動かすと運動の加速度も混ざる。速度推定には計算・初期条件が必要で誤差も蓄積する。",
        "explanation": "鉛直なドアのつまみに固定すれば、重力方向に対する90度の姿勢変化から状態を推定できます。ただし固定と校正が必要で、画像は確認できません。"
      },
      {
        "id": "c1",
        "label": "マイク（鍵を回した音）",
        "devices": [
          "microphone"
        ],
        "evaluation": "unsuitable",
        "information": "周囲の音の大きさ（相対値）",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "V2の機能。音量のしきい値を決めて使う。校正した騒音計のdB値ではなく、距離・騒音の影響を受ける。",
        "explanation": "施錠と解錠で似た音がし、音がした記録だけでは今どちらの状態か分かりません。"
      },
      {
        "id": "c2",
        "label": "人感センサ",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "視野内の赤外線量の変化に対する反応",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。",
        "explanation": "人が近くにいても、鍵をかけたとは限りません。つまみの状態は測れません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "室内側のサムターンの施錠・解錠時の向きを学習します。今の画像も確認できる方法です。実際の向きとの対応を確認し、見えない・暗い場合は「不明」とします。",
    "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。",
    "learningPoint": "今の状態を調べることと、過去に音がしたことは別。",
    "misconception": "鍵の音や近くの人を検出すれば、今の施錠状態が分かる。",
    "outputs": [
      "led"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  },
  {
    "id": "q9",
    "stage": 2,
    "title": "勉強中のスマホ注意係",
    "scenario": "勉強中、スマホを手に取っている自分に注意してほしい。",
    "requirements": "ついスマホを触ってしまう。実際に手に取る様子を調べたいが、決めた台からの持ち上げを手がかりにしてもよい。",
    "image": "assets/scenes-v3-stage2.png",
    "sceneSheet": "v3stage2",
    "sceneTile": 3,
    "imageAlt": "勉強机のノートの前で、中学生がついスマホを手に取って見ている。",
    "choices": [
      {
        "id": "best",
        "label": "AIカメラ（手に取る様子を分類）",
        "devices": [
          "ai-image"
        ],
        "evaluation": "optimal",
        "information": "カメラ画像を学習済みモデルが分類した結果",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。",
        "explanation": "スマホを手に持つ場面を学習し、その様子を分類して注意する案です。手元が隠れたり似た物を持ったりすると誤認識します。"
      },
      {
        "id": "c0",
        "label": "重量センサ（スマホ台）",
        "devices": [
          "scale"
        ],
        "evaluation": "possible",
        "information": "荷重。校正して重さに換算",
        "strength": "条件と配置を調整すれば、間接的な手がかりを得られる。",
        "limitations": "容器・寝具の重さを差し引く。振動、偏った荷重、他の物や動物が触れた重さにも反応する。",
        "explanation": "スマホを置いた台が軽くなれば通知できます。ただし別の場所に置いただけでも通知し、実際に操作中かは分かりません。"
      },
      {
        "id": "c1",
        "label": "明るさセンサ（スマホの下）",
        "devices": [
          "light"
        ],
        "evaluation": "possible",
        "information": "LED表示部で検出する周囲の明るさ",
        "strength": "条件と配置を調整すれば、間接的な手がかりを得られる。",
        "limitations": "影・設置方向・本体の表示の影響に注意。動きは別の入力で調べる。",
        "explanation": "明るい部屋でスマホが光を遮る配置なら、持ち上げた変化を使えます。ただし照明や影、置き方の影響を受け、操作中とは限りません。"
      },
      {
        "id": "c2",
        "label": "温度センサ（スマホの下）",
        "devices": [
          "temperature"
        ],
        "evaluation": "unsuitable",
        "information": "micro:bitの基板付近の温度",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "プロセッサの温度を使った推定。環境温度とずれる場合があり、精密な室温計ではない。",
        "explanation": "スマホの温度は処理や充電、室温で変わり、取り去っても熱が残ります。置いてあるかをすぐ安定して判定するには不向きです。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "スマホを手に持つ場面を学習し、その様子を分類して注意する案です。手元が隠れたり似た物を持ったりすると誤認識します。",
    "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。",
    "learningPoint": "直接見たい状態と、台から外れたという間接的な手がかりを区別しよう。",
    "misconception": "台にスマホがないなら、必ず操作している。",
    "outputs": [
      "speaker",
      "vibrator"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  },
  {
    "id": "q10",
    "stage": 2,
    "title": "置き配の持ち去りお知らせ",
    "scenario": "住人以外が置き配の荷物を持ち上げたら、警報を鳴らそう。",
    "requirements": "玄関の決めた台に荷物を置いてもらう試作。登録した住人が受け取るときは鳴らさず、それ以外の持ち上げを知らせたい。",
    "image": "assets/scenes-v3-stage2.png",
    "sceneSheet": "v3stage2",
    "sceneTile": 4,
    "imageAlt": "玄関の段ボールを、住人が知らない人が持ち上げようとしている。",
    "choices": [
      {
        "id": "best",
        "label": "AIカメラ＋重量センサ",
        "devices": [
          "ai-image",
          "scale"
        ],
        "evaluation": "optimal",
        "information": "カメラ画像を学習済みモデルが分類した結果／荷重。校正して重さに換算",
        "strength": "今回の目的に必要な情報を取得できる。",
        "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。 容器・寝具の重さを差し引く。振動、偏った荷重、他の物や動物が触れた重さにも反応する。",
        "explanation": "重さが減ったときに、カメラの住人分類と組み合わせる試作です。顔が隠れる、写真で誤認識するなどの弱点があり、犯人の断定や確実な本人認証には使えません。"
      },
      {
        "id": "c0",
        "label": "超音波距離センサ＋重量センサ",
        "devices": [
          "distance",
          "scale"
        ],
        "evaluation": "unsuitable",
        "information": "超音波の往復時間から求める対象までの距離／荷重。校正して重さに換算",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "斜面、細い物、柔らかい物、検知範囲外は苦手。模型用で実車の安全装置ではない。接続時は電圧の適合を確認する。 容器・寝具の重さを差し引く。振動、偏った荷重、他の物や動物が触れた重さにも反応する。",
        "explanation": "荷物の重さや人の接近は調べられますが、その人が住人かどうかを区別できません。"
      },
      {
        "id": "c1",
        "label": "人感センサ＋重量センサ",
        "devices": [
          "pir",
          "scale"
        ],
        "evaluation": "unsuitable",
        "information": "視野内の赤外線量の変化に対する反応／荷重。校正して重さに換算",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "動物や温度変化にも反応しうる。静止した人や周囲との温度差が小さい場合は苦手。反応に保持時間もある。 容器・寝具の重さを差し引く。振動、偏った荷重、他の物や動物が触れた重さにも反応する。",
        "explanation": "動きと荷重変化は分かっても、住人が受け取ったのか、それ以外の人なのかは分かりません。"
      },
      {
        "id": "c2",
        "label": "AIマイク（持ち去る音を認識）",
        "devices": [
          "ai-sound"
        ],
        "evaluation": "unsuitable",
        "information": "マイク音声を学習済みモデルが分類した結果",
        "strength": "別の目的では利用できるが、今回必要な情報が不足する。",
        "limitations": "音量だけの検知と異なる。騒音や録音条件、未知の音で誤分類。Chromebook等との連携が必要。",
        "explanation": "静かに持ち上げると聞き逃し、車の音などでも間違う可能性があります。音だけでは住人かどうかも分かりません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "重さが減ったときに、カメラの住人分類と組み合わせる試作です。顔が隠れる、写真で誤認識するなどの弱点があり、犯人の断定や確実な本人認証には使えません。",
    "limitations": "背景、光、角度、隠れ、学習データの偏りで誤分類。Chromebook等で実行し、micro:bitと連携する。 容器・寝具の重さを差し引く。振動、偏った荷重、他の物や動物が触れた重さにも反応する。",
    "learningPoint": "荷物の変化と人の分類は別の役割。AIの分類だけで盗難や本人を確定できない。",
    "misconception": "AIカメラの住人分類は、確実な本人認証になる。",
    "outputs": [
      "speaker"
    ],
    "sourceNotes": [
      "身近な働きを授業用の入力で再現する設計。実在製品の方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/"
    ]
  }
];
