export const questions = [
  {
    "id": "q1",
    "stage": 1,
    "title": "学校の冷水機",
    "scenario": "飲みたい人の操作で、飲用の水を出そう。",
    "requirements": "飲みたい意思を明確に受け取る。手袋でも操作でき、意図しない給水を抑えたい。低コスト・簡単な構成を優先。",
    "image": "assets/stage1-scenes.png",
    "sceneSheet": "stage1",
    "sceneTile": 0,
    "imageAlt": "飲用の冷水機で、利用者が給水ボタンを押す場面。",
    "choices": [
      {
        "id": "best",
        "label": "A・Bボタン",
        "devices": [
          "buttons"
        ],
        "evaluation": "optimal",
        "information": "ボタンを押した操作",
        "strength": "意思を直接入力でき、学習や追加の認識処理が不要。",
        "limitations": "押したことは分かるが、飲みたい気持ち自体を測るわけではない。",
        "explanation": "「押すと水が出る」と決めれば、本人の操作を受け取れる。近くにいるだけでは給水せず、手袋でも扱いやすい。"
      },
      {
        "id": "c0",
        "label": "AI音認識で給水の合図を分類",
        "devices": [
          "ai-sound"
        ],
        "evaluation": "possible",
        "information": "学習した「水を出して」などの音の分類",
        "strength": "手を使わずに要求できる。",
        "limitations": "騒音や他人の声で誤認識。Chromebook等と学習が必要。",
        "explanation": "合図を学習すれば実現できます。ただし、認識の調整・費用・誤作動への対策が増え、今回はボタンより不利です。"
      },
      {
        "id": "c1",
        "label": "AI画像認識で給水の合図を分類",
        "devices": [
          "ai-image"
        ],
        "evaluation": "possible",
        "information": "学習した要求の合図を含む画像の分類",
        "strength": "非接触の操作を設計できる。",
        "limitations": "背景・照明・手の見え方で誤認識。Chromebook等が必要。",
        "explanation": "要求の合図を決めて学習すれば実現できます。ただし、単に人を映すだけでは意思は分からず、準備と処理も複雑です。"
      },
      {
        "id": "c2",
        "label": "超音波距離センサで人の接近を検出",
        "devices": [
          "distance"
        ],
        "evaluation": "unsuitable",
        "information": "センサから物までの距離",
        "strength": "近づいた物を非接触で検知できる。",
        "limitations": "飲む意思や、人と他の物の違いは分からない。",
        "explanation": "近くを通っただけでも反応します。距離から「水を飲みたい」は判断できず、意図しない給水につながります。"
      },
      {
        "id": "c3",
        "label": "人感センサで動きを検出",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "赤外線量の変化",
        "strength": "人などの動きの手がかりを得られる。",
        "limitations": "人間だけの識別も、飲む意思の取得もできない。",
        "explanation": "動きの反応は給水の要求ではありません。動物や温度変化でも反応するため、これだけで水を出す条件にはできません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "「押すと水が出る」と決めれば、本人の操作を受け取れる。近くにいるだけでは給水せず、手袋でも扱いやすい。",
    "limitations": "押したことは分かるが、飲みたい気持ち自体を測るわけではない。",
    "learningPoint": "自動化する前に、本人の意思が必要か考えよう。ボタンが最も確実な入力になる場面もある。",
    "misconception": "人の存在を検出すれば、その人の意思まで分かる。",
    "outputs": [
      "pump"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  },
  {
    "id": "q2",
    "stage": 1,
    "title": "車の駐車支援",
    "scenario": "バックするとき、壁まで何cmか知らせよう。",
    "requirements": "低速・近距離の授業用模型。後方の平らな壁までの距離を数値で測る。安価で簡単な構成を優先。",
    "image": "assets/stage1-scenes.png",
    "sceneSheet": "stage1",
    "sceneTile": 1,
    "imageAlt": "車が後方の壁へバックして駐車する様子。車と壁の間隔が見える。",
    "choices": [
      {
        "id": "best",
        "label": "超音波距離センサ HC-SR04",
        "devices": [
          "distance"
        ],
        "evaluation": "optimal",
        "information": "超音波の往復時間から求めた距離",
        "strength": "対象までの距離を数値で取得できる。",
        "limitations": "斜面・細い物・柔らかい物・範囲外は苦手。実車用の保証はない。",
        "explanation": "音が戻る時間から距離を計算します。今回の近距離の平らな壁には適しています。実車の安全確認を置き換えるものではありません。"
      },
      {
        "id": "c0",
        "label": "超音波距離センサ＋AI画像認識",
        "devices": [
          "distance",
          "ai-image"
        ],
        "evaluation": "possible",
        "information": "距離の数値と学習した画像の分類",
        "strength": "距離を測り、見えている物の種類も分類できる。",
        "limitations": "今回不要な画像学習とChromebook等との連携が増える。",
        "explanation": "距離は測れるので実現できます。ただし、壁の種類を知る必要はなく、AIを加えても今回必要な測距の利点は増えません。"
      },
      {
        "id": "c1",
        "label": "AI画像認識だけ",
        "devices": [
          "ai-image"
        ],
        "evaluation": "unsuitable",
        "information": "学習した画像の種類",
        "strength": "壁などの見た目を分類できる。",
        "limitations": "単純な画像分類の結果はcmの距離ではない。",
        "explanation": "障害物を見つけることと、何cm離れているかを測ることは別です。この画像分類だけでは正確な距離を直接測れません。"
      },
      {
        "id": "c2",
        "label": "人感センサ",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "赤外線量の変化",
        "strength": "動く人などを検知する手がかりになる。",
        "limitations": "壁までの距離は取得できない。",
        "explanation": "人などの動きへの反応から、後方の静止した壁までの距離は求められません。"
      },
      {
        "id": "c3",
        "label": "加速度センサ",
        "devices": [
          "accelerometer"
        ],
        "evaluation": "unsuitable",
        "information": "車体にかかる加速度",
        "strength": "車体の揺れや加速の変化を取得できる。",
        "limitations": "速度や壁までの距離を直接測らない。",
        "explanation": "車体の動きは測れても壁の位置は分かりません。加速度から速度を推定するにも計算や初期条件が必要で、距離計の代わりにはなりません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "音が戻る時間から距離を計算します。今回の近距離の平らな壁には適しています。実車の安全確認を置き換えるものではありません。",
    "limitations": "斜面・細い物・柔らかい物・範囲外は苦手。実車用の保証はない。",
    "learningPoint": "物を分類することと距離を測ることは別。センサを増やせば必ず良くなるわけではない。",
    "misconception": "AI画像認識なら距離も直接分かる。加速度センサは速度計である。",
    "outputs": [
      "led",
      "speaker"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  },
  {
    "id": "q3",
    "stage": 1,
    "title": "夜間の自動照明",
    "scenario": "暗いとき、通路に動きがあれば点灯しよう。",
    "requirements": "昼は点灯しない。暗くても動きがなければ点灯しない。薄暗い通路で、動物への反応は許容。低コストと単純さを優先。",
    "image": "assets/stage1-scenes.png",
    "sceneSheet": "stage1",
    "sceneTile": 2,
    "imageAlt": "薄暗い通路を人が歩き、壁の照明が点灯している。",
    "choices": [
      {
        "id": "best",
        "label": "明るさセンサ＋人感センサ",
        "devices": [
          "light",
          "pir"
        ],
        "evaluation": "optimal",
        "information": "周囲の明るさと赤外線量の変化",
        "strength": "「暗い」かつ「動きがある」を組み合わせられる。",
        "limitations": "静止した人や周囲との温度差が小さいと苦手。人だけを見分けない。",
        "explanation": "2つの値をプログラムでAND条件にします。明るい昼や動きのない夜の点灯を抑えられます。人感センサは人間専用の識別器ではありません。"
      },
      {
        "id": "c0",
        "label": "明るさセンサ＋AI画像認識",
        "devices": [
          "light",
          "ai-image"
        ],
        "evaluation": "possible",
        "information": "明るさと人物を含む学習画像の分類",
        "strength": "人物の見た目を使った分類もできる。",
        "limitations": "暗さ・背景で誤判定。学習・計算・Chromebook等が必要。",
        "explanation": "カメラに映る薄暗さなら実現できます。ただし、暗所の認識調整や処理・電力が増え、今回の安価な動き検知より複雑です。"
      },
      {
        "id": "c1",
        "label": "人感センサだけ",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "赤外線量の変化",
        "strength": "動きの手がかりを取得できる。",
        "limitations": "周囲が暗いか分からない。",
        "explanation": "昼でも人などが動くと反応します。明るい昼には点灯しない、という条件をこれだけでは判断できません。"
      },
      {
        "id": "c2",
        "label": "明るさセンサだけ",
        "devices": [
          "light"
        ],
        "evaluation": "unsuitable",
        "information": "周囲の明るさ",
        "strength": "暗さを判断できる。",
        "limitations": "人などの動きは取得できない。",
        "explanation": "暗いことは分かりますが、誰も通っていない夜にも点灯してしまいます。動きの情報が足りません。"
      },
      {
        "id": "c3",
        "label": "温度センサだけ",
        "devices": [
          "temperature"
        ],
        "evaluation": "unsuitable",
        "information": "micro:bitの基板付近の温度",
        "strength": "温度変化を調べられる。",
        "limitations": "通路の明るさや通過する動きを直接取得できない。",
        "explanation": "暑い・寒いと、暗い・人が来たは別の情報です。必要な2つの条件が測れません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "2つの値をプログラムでAND条件にします。明るい昼や動きのない夜の点灯を抑えられます。人感センサは人間専用の識別器ではありません。",
    "limitations": "静止した人や周囲との温度差が小さいと苦手。人だけを見分けない。",
    "learningPoint": "入力を増やす目的を説明しよう。この問題では「暗さ」と「動き」の両方が必要。",
    "misconception": "人感センサは人間だけを見分け、明るさも分かる。",
    "outputs": [
      "led"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  },
  {
    "id": "q4",
    "stage": 1,
    "title": "画面の自動回転",
    "scenario": "端末を縦・横に傾けたら、表示を切り替えよう。",
    "requirements": "外部カメラを使わず、端末単体で自動判定する。ゆっくり傾けて使う。追加の入力と処理をできるだけ減らす。",
    "image": "assets/stage1-scenes.png",
    "sceneSheet": "stage1",
    "sceneTile": 3,
    "imageAlt": "縦置きと横置きのタブレットで、画面の表示方向が変わる。",
    "choices": [
      {
        "id": "best",
        "label": "加速度センサ",
        "devices": [
          "accelerometer"
        ],
        "evaluation": "optimal",
        "information": "各軸の加速度（重力の影響を含む）",
        "strength": "静止に近い状態なら重力の方向から姿勢を推定できる。",
        "limitations": "激しく動かすと運動の加速度も混ざる。画面の縦横を直接読まない。",
        "explanation": "各軸の測定値から重力の向きを推定し、プログラムが縦・横を判断します。加速度センサ自身が表示の向きを決めているわけではありません。"
      },
      {
        "id": "c0",
        "label": "加速度センサ＋コンパス",
        "devices": [
          "accelerometer",
          "compass"
        ],
        "evaluation": "possible",
        "information": "加速度と磁場",
        "strength": "傾きと方位の別々の情報を得られる。",
        "limitations": "磁気への対策と不要な処理が増える。",
        "explanation": "加速度を使って実現できます。ただし、今回の縦横判定には方位の情報は不要で、コンパスを加える利点がありません。"
      },
      {
        "id": "c1",
        "label": "コンパスだけ",
        "devices": [
          "compass"
        ],
        "evaluation": "unsuitable",
        "information": "磁場の向き・強さ",
        "strength": "方位推定に使える。",
        "limitations": "重力の方向を測らない。磁性体にも影響される。",
        "explanation": "方位と縦横の姿勢は別です。磁場だけでは今回必要な重力方向に対する傾きを安定して判断できません。"
      },
      {
        "id": "c2",
        "label": "AI画像認識で端末を見る",
        "devices": [
          "ai-image"
        ],
        "evaluation": "unsuitable",
        "information": "カメラに映った端末の画像分類",
        "strength": "外から見える端末の姿勢を分類する案は考えられる。",
        "limitations": "別のカメラで端末を見る必要がある。",
        "explanation": "外部から撮影すれば分類する案はありますが、外部カメラを使わず端末単体で判定する今回の条件に合いません。"
      },
      {
        "id": "c3",
        "label": "A・Bボタンで縦横を指定",
        "devices": [
          "buttons"
        ],
        "evaluation": "unsuitable",
        "information": "ボタンを押した操作",
        "strength": "本人が表示方向を選べる。",
        "limitations": "端末の傾きは取得しない。",
        "explanation": "手動切替ならできますが、端末を傾けるだけで自動回転するという今回の働きにはなりません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "各軸の測定値から重力の向きを推定し、プログラムが縦・横を判断します。加速度センサ自身が表示の向きを決めているわけではありません。",
    "limitations": "激しく動かすと運動の加速度も混ざる。画面の縦横を直接読まない。",
    "learningPoint": "センサの測定値をプログラムが意味づけする。加速度は速度や画面の縦横そのものではない。",
    "misconception": "センサが画面の縦横を直接読み取っている。",
    "outputs": [
      "led"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  },
  {
    "id": "q5",
    "stage": 1,
    "title": "騒音を知らせる装置",
    "scenario": "音が大きくなったら、教室に注意を促そう。",
    "requirements": "音の種類や話の内容は不要。一定以上の音量だけを知りたい。基準は固定。Chromebookも使えるが、低コストで簡単な構成を優先。",
    "image": "assets/stage1-scenes.png",
    "sceneSheet": "stage1",
    "sceneTile": 4,
    "imageAlt": "図書室で話し声が大きくなり、卓上の装置が注意を促す。",
    "choices": [
      {
        "id": "best",
        "label": "micro:bit内蔵マイク",
        "devices": [
          "microphone"
        ],
        "evaluation": "optimal",
        "information": "周囲の音の大きさ（相対値）",
        "strength": "音量のしきい値を決めるだけでよい。",
        "limitations": "標準の値は校正済みの騒音計のdB値ではない。置く場所でも変わる。",
        "explanation": "音の大きさがしきい値を超えたら知らせます。何の音かを分類する必要がないので、内蔵マイクで十分です。"
      },
      {
        "id": "c0",
        "label": "内蔵マイク＋AI音認識",
        "devices": [
          "microphone",
          "ai-sound"
        ],
        "evaluation": "possible",
        "information": "音量と学習した音の分類",
        "strength": "音量判定に、音の種類の分類を追加する案。",
        "limitations": "AIにはChromebook等と学習・連携が必要。不要な分類が増える。",
        "explanation": "音量で通知するので実現できます。ただし、今回不要なAI分類とChromebook等の連携が増え、費用・処理の複雑さで不利です。"
      },
      {
        "id": "c1",
        "label": "内蔵マイク＋A・Bボタンでしきい値調整",
        "devices": [
          "microphone",
          "buttons"
        ],
        "evaluation": "possible",
        "information": "音量と調整操作",
        "strength": "利用者が音量の基準を変更できる。",
        "limitations": "今回は固定の基準でよく、操作と設定の処理が増える。",
        "explanation": "実現できます。ただし、今回必要なのは固定の基準による通知だけなので、調整の仕組みを追加すると構成が複雑になります。"
      },
      {
        "id": "c2",
        "label": "人感センサ",
        "devices": [
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "赤外線量の変化",
        "strength": "動く人などの手がかりを得られる。",
        "limitations": "音量は測れない。",
        "explanation": "静かに動く人にも反応し、座って大声を出していても音量は分かりません。"
      },
      {
        "id": "c3",
        "label": "AI画像認識",
        "devices": [
          "ai-image"
        ],
        "evaluation": "unsuitable",
        "information": "画像の分類",
        "strength": "カメラに映った様子を分類できる。",
        "limitations": "画像には音量の情報がない。Chromebook等も必要。",
        "explanation": "口が開いている画像と大きな音は一致しません。必要な音量を取得できません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "音の大きさがしきい値を超えたら知らせます。何の音かを分類する必要がないので、内蔵マイクで十分です。",
    "limitations": "標準の値は校正済みの騒音計のdB値ではない。置く場所でも変わる。",
    "learningPoint": "普通のマイクの音量判定とAIの音の分類は役割が違う。目的に不要なAIは増やさない。",
    "misconception": "AI音認識とマイクの音量判定は同じである。",
    "outputs": [
      "led",
      "speaker"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  },
  {
    "id": "q6",
    "stage": 2,
    "title": "猫専用の自動給水",
    "scenario": "猫が来て、水が少ないときだけ給水しよう。",
    "requirements": "犬も来る。猫・犬を区別し、固定した水皿の残量を測る。Chromebookと画像学習を使える。水皿以外の荷重を避ける。",
    "image": "assets/stage2-scenes.png",
    "sceneSheet": "stage2",
    "sceneTile": 0,
    "imageAlt": "猫と犬がいる場所で、水の少ない皿を重量で確認して給水する。",
    "choices": [
      {
        "id": "best",
        "label": "AI画像認識＋重量センサ",
        "devices": [
          "ai-image",
          "scale"
        ],
        "evaluation": "optimal",
        "information": "猫・犬の画像分類と水皿の荷重",
        "strength": "動物の種類と水の残量を別々に確認できる。",
        "limitations": "画像の誤分類や猫の接触荷重に注意。容器の重さを差し引く。",
        "explanation": "猫の分類結果と、水が少ない荷重をAND条件にします。Teachable MachineはChromebook等で動かし、その結果をmicro:bitへ渡す連携が必要です。"
      },
      {
        "id": "c0",
        "label": "AI画像認識＋重量＋距離センサ",
        "devices": [
          "ai-image",
          "scale",
          "distance"
        ],
        "evaluation": "possible",
        "information": "画像分類、荷重、物までの距離",
        "strength": "種類と残量を確認し、接近距離も測れる。",
        "limitations": "配線・調整が増える。猫犬の区別は距離ではできない。",
        "explanation": "実現できます。ただし、種類と残量だけで判断できる今回の条件では、距離センサの追加は費用と複雑さを増やします。"
      },
      {
        "id": "c1",
        "label": "重量センサだけ",
        "devices": [
          "scale"
        ],
        "evaluation": "unsuitable",
        "information": "水皿の荷重",
        "strength": "容器の重さを差し引けば残量の手がかりになる。",
        "limitations": "猫か犬かは分からない。",
        "explanation": "水が少ないかは調べられますが、猫が来たときだけという条件に必要な動物の区別ができません。"
      },
      {
        "id": "c2",
        "label": "AI画像認識だけ",
        "devices": [
          "ai-image"
        ],
        "evaluation": "unsuitable",
        "information": "学習した猫・犬の画像分類",
        "strength": "来た動物の種類を分類できる。",
        "limitations": "今回は残量を分類する学習・設置はしていない。",
        "explanation": "猫と犬を分類するモデルだけでは水の残量は分かりません。見え方だけで残量まで分かると決めつけられません。"
      },
      {
        "id": "c3",
        "label": "人感センサ＋重量センサ",
        "devices": [
          "pir",
          "scale"
        ],
        "evaluation": "unsuitable",
        "information": "赤外線量の変化と水皿の荷重",
        "strength": "動きと残量の手がかりを得られる。",
        "limitations": "人感センサは猫と犬を識別できない。",
        "explanation": "水が少なくても、来たのが猫か犬かを区別できません。人感センサの反応は「猫が来た」という意味ではありません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "猫の分類結果と、水が少ない荷重をAND条件にします。Teachable MachineはChromebook等で動かし、その結果をmicro:bitへ渡す連携が必要です。",
    "limitations": "画像の誤分類や猫の接触荷重に注意。容器の重さを差し引く。",
    "learningPoint": "1つのセンサに何でも任せず、動物の分類と水の残量の役割を分けよう。",
    "misconception": "AIは学習していない残量まで正確に分かる。",
    "outputs": [
      "pump"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  },
  {
    "id": "q7",
    "stage": 2,
    "title": "出発前の忘れ物チェック",
    "scenario": "チェックボタンを押したら、水筒を確認しよう。",
    "requirements": "出発前に本人がA・Bボタンを押す。机のどこにある水筒も他の物と区別する。時刻は使わない。Chromebookを利用できる。",
    "image": "assets/stage2-scenes.png",
    "sceneSheet": "stage2",
    "sceneTile": 1,
    "imageAlt": "出発前の生徒がボタンを押す。机に水筒が残り、カメラが机を見ている。",
    "choices": [
      {
        "id": "best",
        "label": "A・Bボタン＋AI画像認識",
        "devices": [
          "buttons",
          "ai-image"
        ],
        "evaluation": "optimal",
        "information": "確認を始める操作と、水筒が映る画像の分類",
        "strength": "本人の意思で確認を始め、物の見た目を分類できる。",
        "limitations": "水筒が隠れると見落とす。背景や照明で誤認識する。",
        "explanation": "ボタンは確認開始の意思、AIは水筒の有無の分類を受け持ちます。見えない水筒まで分かるわけではなく、カメラ位置と学習データの確認が必要です。"
      },
      {
        "id": "c0",
        "label": "A・Bボタン＋AI画像認識＋距離センサ",
        "devices": [
          "buttons",
          "ai-image",
          "distance"
        ],
        "evaluation": "possible",
        "information": "操作、画像分類、対象までの距離",
        "strength": "確認開始と水筒の画像分類を行える。",
        "limitations": "距離の情報は水筒の識別には不要。配線や調整が増える。",
        "explanation": "実現できます。ただし、机上の物の種類を調べる今回の条件では距離測定を追加しても必要な情報は増えず、構成が複雑になります。"
      },
      {
        "id": "c1",
        "label": "A・Bボタン＋重量センサ",
        "devices": [
          "buttons",
          "scale"
        ],
        "evaluation": "unsuitable",
        "information": "確認操作と机上の荷重",
        "strength": "操作した時点の重さを測れる。",
        "limitations": "ほかの物と水筒を重さだけでは区別できない。",
        "explanation": "同じ重さの別の物もあります。置き場所が自由で他の物もある机では、水筒が残っていると判断する情報が足りません。"
      },
      {
        "id": "c2",
        "label": "AI画像認識だけ",
        "devices": [
          "ai-image"
        ],
        "evaluation": "unsuitable",
        "information": "水筒が映る学習画像の分類",
        "strength": "見えている水筒を分類できる。",
        "limitations": "本人が出発前に確認したいという操作を受け取れない。",
        "explanation": "水筒があるかを分類しても、指定されたチェック開始の入力がありません。時刻や本人の意思まで画像から分かるわけではありません。"
      },
      {
        "id": "c3",
        "label": "A・Bボタンだけ",
        "devices": [
          "buttons"
        ],
        "evaluation": "unsuitable",
        "information": "確認を始める操作",
        "strength": "意思を受け取れる。",
        "limitations": "机上の水筒は検出できない。",
        "explanation": "確認を始めたいことは分かりますが、水筒が机に残っている情報が取得できません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "ボタンは確認開始の意思、AIは水筒の有無の分類を受け持ちます。見えない水筒まで分かるわけではなく、カメラ位置と学習データの確認が必要です。",
    "limitations": "水筒が隠れると見落とす。背景や照明で誤認識する。",
    "learningPoint": "ボタンとAIは別の役割。開始の意思と物の分類を組み合わせよう。",
    "misconception": "時刻や意思まで画像認識に任せられる。",
    "outputs": [
      "led",
      "speaker"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  },
  {
    "id": "q8",
    "stage": 2,
    "title": "二度寝防止装置",
    "scenario": "目覚まし停止後、ベッドに戻ったら知らせよう。",
    "requirements": "A・Bボタンで停止。一定の寝具を置いた一人用ベッドに再び荷重が加わるかを検出する。睡眠状態は測らない。映像なしの単純な構成を優先。",
    "image": "assets/stage2-scenes.png",
    "sceneSheet": "stage2",
    "sceneTile": 2,
    "imageAlt": "朝、停止操作の後に生徒がベッドへ戻る。ベッド脚に荷重検出の台がある。",
    "choices": [
      {
        "id": "best",
        "label": "A・Bボタン＋重量センサ",
        "devices": [
          "buttons",
          "scale"
        ],
        "evaluation": "optimal",
        "information": "目覚ましを止める操作とベッドの荷重",
        "strength": "映像なしで在床の手がかりを得られる。",
        "limitations": "荷物や他人の荷重とも区別できない。寝具分の校正が必要。",
        "explanation": "停止ボタン後に一度荷重が減り、再び増えたら知らせます。タイマーで短い継続を確認できますが、測っているのは重さで、眠りではありません。"
      },
      {
        "id": "c0",
        "label": "A・Bボタン＋超音波距離センサ",
        "devices": [
          "buttons",
          "distance"
        ],
        "evaluation": "possible",
        "information": "停止操作とベッド上までの距離",
        "strength": "布団の高さの変化から戻った可能性を調べられる。",
        "limitations": "姿勢や布団の形でも距離が変わり、配置と判定の調整が必要。",
        "explanation": "実現できます。ただし、今回の一定の寝具への荷重検出より、布団や姿勢による変化を見分ける調整が増えます。睡眠は判定しません。"
      },
      {
        "id": "c1",
        "label": "A・Bボタン＋AI画像認識",
        "devices": [
          "buttons",
          "ai-image"
        ],
        "evaluation": "unsuitable",
        "information": "停止操作と画像の分類",
        "strength": "撮影できれば在床の見た目を分類する案になる。",
        "limitations": "映像なしという条件に反する。睡眠を確実に判定しない。",
        "explanation": "在床を分類する案は考えられますが、今回は映像を使わない条件です。目を閉じた画像も、眠っている証明にはなりません。"
      },
      {
        "id": "c2",
        "label": "A・Bボタン＋人感センサ",
        "devices": [
          "buttons",
          "pir"
        ],
        "evaluation": "unsuitable",
        "information": "停止操作と赤外線量の変化",
        "strength": "ベッド付近の動きに反応できる。",
        "limitations": "静止した人の在床や睡眠は確実に分からない。",
        "explanation": "部屋の別の場所で動いても反応し、ベッドで静止すると検出し続けられません。寝戻りの確認に情報が足りません。"
      },
      {
        "id": "c3",
        "label": "A・Bボタンだけ",
        "devices": [
          "buttons"
        ],
        "evaluation": "unsuitable",
        "information": "停止ボタンを押した操作",
        "strength": "停止の意思を受け取れる。",
        "limitations": "その後ベッドに戻ったことは測れない。",
        "explanation": "停止操作だけでは、その後のベッドの状態が分かりません。戻ったかを検出する入力が必要です。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "停止ボタン後に一度荷重が減り、再び増えたら知らせます。タイマーで短い継続を確認できますが、測っているのは重さで、眠りではありません。",
    "limitations": "荷物や他人の荷重とも区別できない。寝具分の校正が必要。",
    "learningPoint": "センサが反応した事実と知りたい状態は別。荷重は在床の手がかりであり睡眠の測定ではない。",
    "misconception": "人感センサや重量センサなら睡眠状態を直接測れる。",
    "outputs": [
      "speaker",
      "vibrator"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  },
  {
    "id": "q9",
    "stage": 2,
    "title": "置き配ボックスの試作品",
    "scenario": "荷物の検知と、取り出す操作を分けよう。",
    "requirements": "教室内の動作模型。荷物の有無を測り、受取人役だけが触れる管理下のA・Bボタンで開く。本人認証・実用防犯は対象外。単純さを優先。",
    "image": "assets/stage2-scenes.png",
    "sceneSheet": "stage2",
    "sceneTile": 3,
    "imageAlt": "教室の置き配動作模型。荷物が入った箱、荷重台、管理された操作ボタンと小型サーボ。",
    "choices": [
      {
        "id": "best",
        "label": "重量センサ＋A・Bボタン",
        "devices": [
          "scale",
          "buttons"
        ],
        "evaluation": "optimal",
        "information": "荷物の荷重と管理下の操作",
        "strength": "荷物の検知と、取り出す操作を別々に受け取れる。",
        "limitations": "ボタンは本人認証ではない。模型の施錠は実用防犯を保証しない。",
        "explanation": "重さで荷物を検知し、管理されたボタン操作でサーボを動かす模型です。実用には別途本人認証や堅牢な施錠が必要で、今回はその性能を評価しません。"
      },
      {
        "id": "c0",
        "label": "超音波距離センサ＋A・Bボタン",
        "devices": [
          "distance",
          "buttons"
        ],
        "evaluation": "possible",
        "information": "箱の底または荷物上面までの距離と管理下の操作",
        "strength": "重さを使わず、箱の空き具合の変化から荷物の手がかりを得られる。",
        "limitations": "小さい荷物、斜めの面、センサの範囲外では検知しにくい。配置としきい値の調整が必要。",
        "explanation": "底までの距離と荷物を置いた後の距離を比べれば実現できます。ただし、荷物の形や位置に合わせた調整が増え、今回の単純な荷重検知より不利です。"
      },
      {
        "id": "c1",
        "label": "重量センサだけ",
        "devices": [
          "scale"
        ],
        "evaluation": "unsuitable",
        "information": "荷物の荷重",
        "strength": "荷物が入った手がかりになる。",
        "limitations": "受取人役の取り出す操作は受け取れない。",
        "explanation": "荷物があることと、取り出しを許可することは別です。重さだけでは指定された操作を確認できません。"
      },
      {
        "id": "c2",
        "label": "A・Bボタンだけ",
        "devices": [
          "buttons"
        ],
        "evaluation": "unsuitable",
        "information": "ボタンを押した操作",
        "strength": "模型を開く指示を入力できる。",
        "limitations": "荷物の有無を自動検出できない。",
        "explanation": "取り出す操作は受け取れますが、荷物が入ったかの情報を取得できません。ボタン自体も本人の証明にはなりません。"
      },
      {
        "id": "c3",
        "label": "AI画像認識で顔を分類するだけ",
        "devices": [
          "ai-image"
        ],
        "evaluation": "unsuitable",
        "information": "学習した顔画像の分類",
        "strength": "似た見た目の画像を分類できる。",
        "limitations": "通常の画像分類は写真などでも誤認識しうる。荷物の有無も測らない。",
        "explanation": "顔の分類だけを確実な本人認証として扱えません。荷物の検知と指定のボタン操作も満たしていません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "重さで荷物を検知し、管理されたボタン操作でサーボを動かす模型です。実用には別途本人認証や堅牢な施錠が必要で、今回はその性能を評価しません。",
    "limitations": "ボタンは本人認証ではない。模型の施錠は実用防犯を保証しない。",
    "learningPoint": "荷物の検知・操作・本人認証・物理的な施錠は別の役割。授業用模型と本物の防犯性能を区別しよう。",
    "misconception": "単なるボタンやAIの顔分類で本人認証が完成する。",
    "outputs": [
      "servo"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  },
  {
    "id": "q10",
    "stage": 2,
    "title": "機械の異常音検知",
    "scenario": "同じくらいの音量でも、正常音と異常音を区別しよう。",
    "requirements": "正常・異常・背景音をあらかじめ学習できる。Chromebookを利用。音量の大小では区別できず、音の特徴を分類したい。",
    "image": "assets/stage2-scenes.png",
    "sceneSheet": "stage2",
    "sceneTile": 4,
    "imageAlt": "機械のそばのマイクとChromebookで、運転音の特徴を分類する。",
    "choices": [
      {
        "id": "best",
        "label": "AI音認識",
        "devices": [
          "ai-sound"
        ],
        "evaluation": "optimal",
        "information": "マイク音声を学習済みモデルが分類した結果",
        "strength": "学習した正常音と異常音の特徴を分類できる。",
        "limitations": "未学習の音・騒音・録音条件の変化で誤認識。分類は故障の確定診断ではない。",
        "explanation": "Teachable Machine音声プロジェクトをChromebook等で実行します。普通の音量判定と異なり、学習した特徴で分類します。未知の音も含めて実環境で検証が必要です。"
      },
      {
        "id": "c0",
        "label": "AI音認識＋内蔵マイクの音量判定",
        "devices": [
          "ai-sound",
          "microphone"
        ],
        "evaluation": "possible",
        "information": "学習した音の分類と別のマイクによる音量",
        "strength": "特徴の分類を行い、音量も記録できる。",
        "limitations": "今回不要な音量入力が増える。大音量だけを異常とは扱えない。",
        "explanation": "AIの分類を使うので実現できます。ただし、今回区別したいのは音の特徴です。音量センサを増やしても未知音への誤認識は解決しません。"
      },
      {
        "id": "c1",
        "label": "micro:bit内蔵マイクの音量だけ",
        "devices": [
          "microphone"
        ],
        "evaluation": "unsuitable",
        "information": "周囲の音の大きさ",
        "strength": "音量が大きいことを簡単に検出できる。",
        "limitations": "同じ音量の正常音と異常音の種類を区別できない。",
        "explanation": "音が大きいだけで異常とは限りません。音量のしきい値だけでは、この問題の音の特徴の違いを分類できません。"
      },
      {
        "id": "c2",
        "label": "温度センサだけ",
        "devices": [
          "temperature"
        ],
        "evaluation": "unsuitable",
        "information": "micro:bitの基板付近の温度",
        "strength": "温度上昇を調べる別の監視案に使える。",
        "limitations": "音の特徴は取得できない。",
        "explanation": "温度に表れる異常もありますが、今回の正常音と異常音の違いは温度だけでは判断できません。"
      },
      {
        "id": "c3",
        "label": "AIポーズ認識",
        "devices": [
          "ai-pose"
        ],
        "evaluation": "unsuitable",
        "information": "カメラ画像から推定した体のポーズの分類",
        "strength": "体の動きの合図を分類できる。",
        "limitations": "機械の音は取得しない。",
        "explanation": "ポーズと音は別の入力です。AIであっても、取得していない音の特徴を分類することはできません。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "Teachable Machine音声プロジェクトをChromebook等で実行します。普通の音量判定と異なり、学習した特徴で分類します。未知の音も含めて実環境で検証が必要です。",
    "limitations": "未学習の音・騒音・録音条件の変化で誤認識。分類は故障の確定診断ではない。",
    "learningPoint": "AIは取得した情報と学習データの範囲で働く。音量・音の種類・本当の故障を区別しよう。",
    "misconception": "AIなら未知の音でも確実に異常と判定できる。",
    "outputs": [
      "led",
      "speaker"
    ],
    "sourceNotes": [
      "授業用デバイスで働きを再現する設計。実在製品の採用方式を断定しない。",
      "https://playa2021git.github.io/reinvent-device-guide/",
      "https://github.com/playa2021git/reinvent-device-guide/blob/main/js/devices.js"
    ]
  }
];
