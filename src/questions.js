export const questions = [
  {
    "id": "q1",
    "stage": 1,
    "title": "自動泡ハンドソープ",
    "scenario": "手を差し出すと、泡が出る装置をつくろう。",
    "requirements": "屋内・検知距離は約5cm。手の有無だけを、安価で単純な構成で検出する。",
    "image": "assets/soap.svg",
    "choices": [
      {
        "id": "best",
        "label": "近距離の赤外線反射型センサ",
        "evaluation": "optimal",
        "information": "照射した赤外線が手で反射して戻るか",
        "explanation": "近距離の手を小さな構成で検出できる。遮光型のように発光部と受光部の間へ手を入れる構造ではない。外光や手の反射率の影響を受けるため、検知範囲としきい値の調整は必要。",
        "limitations": "外光・反射率・距離で検知結果が変わる。"
      },
      {
        "id": "c0",
        "label": "超音波距離センサ",
        "evaluation": "possible",
        "information": "手までの距離",
        "explanation": "測距でも実現可能だが、この条件では構成や調整が増える。",
        "limitations": "測距でも実現可能だが、この条件では構成や調整が増える。"
      },
      {
        "id": "c1",
        "label": "マイク",
        "evaluation": "unsuitable",
        "information": "周囲の音",
        "explanation": "静かな手の接近を音だけでは判断できない。",
        "limitations": "静かな手の接近を音だけでは判断できない。"
      },
      {
        "id": "c2",
        "label": "加速度センサ",
        "evaluation": "unsuitable",
        "information": "本体の加速度",
        "explanation": "手を近づけても本体は動かない。",
        "limitations": "手を近づけても本体は動かない。"
      },
      {
        "id": "c3",
        "label": "PIR型人感センサ",
        "evaluation": "unsuitable",
        "information": "赤外線量の変化",
        "explanation": "人の動きには反応するが、吐出口の直下の手を限定しにくい。",
        "limitations": "人の動きには反応するが、吐出口の直下の手を限定しにくい。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "近距離の手を小さな構成で検出できる。遮光型のように発光部と受光部の間へ手を入れる構造ではない。外光や手の反射率の影響を受けるため、検知範囲としきい値の調整は必要。",
    "limitations": "外光・反射率・距離で検知結果が変わる。",
    "learningPoint": "手の有無の検出と正確な測距は別の目的。反射型と遮光型の構造も区別しよう。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。"
    ]
  },
  {
    "id": "q2",
    "stage": 1,
    "title": "自動ドア",
    "scenario": "入口へ歩いて近づく人を検出して、ドアを開けよう。",
    "requirements": "屋内。入口前の動く人を広く検知。顔や正確な距離は不要。停止中の人の保護は別の安全センサで行う。",
    "image": "assets/door.svg",
    "choices": [
      {
        "id": "best",
        "label": "マイクロ波ドップラーセンサ",
        "evaluation": "optimal",
        "information": "反射波の周波数変化から動きを検出",
        "explanation": "動く人の接近を広い範囲で検出できる。停止した人を守る安全機能は別途必要。",
        "limitations": "停止した人を守る安全機能は別途必要。"
      },
      {
        "id": "c0",
        "label": "距離センサ",
        "evaluation": "possible",
        "information": "対象までの距離",
        "explanation": "実現可能だが、広い検知範囲を覆う配置や判定が必要。",
        "limitations": "実現可能だが、広い検知範囲を覆う配置や判定が必要。"
      },
      {
        "id": "c1",
        "label": "明るさセンサ",
        "evaluation": "unsuitable",
        "information": "周囲の明るさ",
        "explanation": "人の接近と照度変化は一致しない。",
        "limitations": "人の接近と照度変化は一致しない。"
      },
      {
        "id": "c2",
        "label": "温度センサ",
        "evaluation": "unsuitable",
        "information": "周囲の温度",
        "explanation": "人の接近をすばやく限定できない。",
        "limitations": "人の接近をすばやく限定できない。"
      },
      {
        "id": "c3",
        "label": "マイク",
        "evaluation": "unsuitable",
        "information": "周囲の音",
        "explanation": "無音で近づく人を検出できない。",
        "limitations": "無音で近づく人を検出できない。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "動く人の接近を広い範囲で検出できる。停止した人を守る安全機能は別途必要。",
    "limitations": "停止した人を守る安全機能は別途必要。",
    "learningPoint": "動体の検知と、静止した人の存在の検知は別の役割。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。",
      "https://nabco.nabtesco.com/products_detail/eagle/",
      "https://hotron.com/product/ssr-3/"
    ]
  },
  {
    "id": "q3",
    "stage": 1,
    "title": "夜間の自動照明",
    "scenario": "暗いとき、人が通ったら照明をつけよう。",
    "requirements": "屋外の通路。昼は点灯しない。通過する人を安価に検知し、顔の識別は不要。",
    "image": "assets/light.svg",
    "choices": [
      {
        "id": "best",
        "label": "PIR型人感＋明るさセンサ",
        "evaluation": "optimal",
        "information": "赤外線量の変化と周囲の明るさ",
        "explanation": "人の動きと暗さの両方を条件にできる。静止した人や周囲との温度差が小さい場合は苦手。",
        "limitations": "静止した人や周囲との温度差が小さい場合は苦手。"
      },
      {
        "id": "c0",
        "label": "AIカメラ＋明るさセンサ",
        "evaluation": "possible",
        "information": "画像の分類と明るさ",
        "explanation": "実現可能だが、学習・計算・プライバシーへの配慮が増える。",
        "limitations": "実現可能だが、学習・計算・プライバシーへの配慮が増える。"
      },
      {
        "id": "c1",
        "label": "PIR型人感センサだけ",
        "evaluation": "unsuitable",
        "information": "赤外線量の変化",
        "explanation": "暗いかどうかが分からない。",
        "limitations": "暗いかどうかが分からない。"
      },
      {
        "id": "c2",
        "label": "明るさセンサだけ",
        "evaluation": "unsuitable",
        "information": "周囲の明るさ",
        "explanation": "人が来たかどうかが分からない。",
        "limitations": "人が来たかどうかが分からない。"
      },
      {
        "id": "c3",
        "label": "加速度センサ",
        "evaluation": "unsuitable",
        "information": "本体の揺れ",
        "explanation": "通行人の存在を判断できない。",
        "limitations": "通行人の存在を判断できない。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "人の動きと暗さの両方を条件にできる。静止した人や周囲との温度差が小さい場合は苦手。",
    "limitations": "静止した人や周囲との温度差が小さい場合は苦手。",
    "learningPoint": "「暗い」かつ「人が来た」のように、複数の情報を条件にしよう。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。"
    ]
  },
  {
    "id": "q4",
    "stage": 1,
    "title": "ロボット掃除機",
    "scenario": "家具を避け、部屋の形を把握して掃除しよう。",
    "requirements": "平らな床。照明の変化に左右されにくく、周囲の平面地図を作りたい。予算は確保済み。",
    "image": "assets/robot.svg",
    "choices": [
      {
        "id": "best",
        "label": "走査型LiDAR",
        "evaluation": "optimal",
        "information": "複数方向の対象までの距離",
        "explanation": "周囲の距離を走査して地図作成に利用できる。透明な物や低い物、段差は別の対策が必要。",
        "limitations": "透明な物や低い物、段差は別の対策が必要。"
      },
      {
        "id": "c0",
        "label": "カメラ＋画像処理",
        "evaluation": "possible",
        "information": "画像と特徴点",
        "explanation": "地図作成も実現可能だが、照明や模様の少ない場所の影響を受ける。",
        "limitations": "地図作成も実現可能だが、照明や模様の少ない場所の影響を受ける。"
      },
      {
        "id": "c1",
        "label": "超音波距離センサ1個",
        "evaluation": "possible",
        "information": "一方向のおおまかな距離",
        "explanation": "回転・自己位置推定などを加えれば可能だが、そのままでは周囲の地図は作れない。",
        "limitations": "回転・自己位置推定などを加えれば可能だが、そのままでは周囲の地図は作れない。"
      },
      {
        "id": "c2",
        "label": "接触スイッチだけ",
        "evaluation": "unsuitable",
        "information": "物に触れたか",
        "explanation": "接触前の回避や周囲の地図作成に情報が足りない。",
        "limitations": "接触前の回避や周囲の地図作成に情報が足りない。"
      },
      {
        "id": "c3",
        "label": "明るさセンサ",
        "evaluation": "unsuitable",
        "information": "周囲の明るさ",
        "explanation": "家具の位置や距離は分からない。",
        "limitations": "家具の位置や距離は分からない。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "周囲の距離を走査して地図作成に利用できる。透明な物や低い物、段差は別の対策が必要。",
    "limitations": "透明な物や低い物、段差は別の対策が必要。",
    "learningPoint": "一方向の距離と周囲の地図は別の情報。地図作成には処理も必要。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。"
    ]
  },
  {
    "id": "q5",
    "stage": 1,
    "title": "車の駐車支援",
    "scenario": "バックするとき、障害物までの距離を知らせよう。",
    "requirements": "低速・近距離。広い壁などを対象に、暗所でも安価に距離を測りたい。運転者が安全確認する。",
    "image": "assets/car.svg",
    "choices": [
      {
        "id": "best",
        "label": "超音波距離センサ",
        "evaluation": "optimal",
        "information": "音が戻るまでの時間から距離",
        "explanation": "近距離を暗所でも測れる。細い物・柔らかい物・斜面や測定範囲外には注意。",
        "limitations": "細い物・柔らかい物・斜面や測定範囲外には注意。"
      },
      {
        "id": "c0",
        "label": "ステレオカメラ＋処理",
        "evaluation": "possible",
        "information": "左右画像から推定した距離",
        "explanation": "実現可能だが、費用や計算が増え、暗所や模様の影響も受ける。",
        "limitations": "実現可能だが、費用や計算が増え、暗所や模様の影響も受ける。"
      },
      {
        "id": "c1",
        "label": "単眼カメラの映像表示だけ",
        "evaluation": "unsuitable",
        "information": "後方の映像",
        "explanation": "目視確認に有用だが、処理なしでは距離を数値測定しない。",
        "limitations": "目視確認に有用だが、処理なしでは距離を数値測定しない。"
      },
      {
        "id": "c2",
        "label": "PIR型人感センサ",
        "evaluation": "unsuitable",
        "information": "赤外線量の変化",
        "explanation": "壁までの距離は分からない。",
        "limitations": "壁までの距離は分からない。"
      },
      {
        "id": "c3",
        "label": "ジャイロセンサ",
        "evaluation": "unsuitable",
        "information": "車体の回転速度",
        "explanation": "障害物との距離は分からない。",
        "limitations": "障害物との距離は分からない。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "近距離を暗所でも測れる。細い物・柔らかい物・斜面や測定範囲外には注意。",
    "limitations": "細い物・柔らかい物・斜面や測定範囲外には注意。",
    "learningPoint": "映像を見ることと、距離を数値で測ることを区別しよう。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。"
    ]
  },
  {
    "id": "q6",
    "stage": 2,
    "title": "猫専用の自動給水装置",
    "scenario": "猫が来て、水が少ないときだけ給水しよう。",
    "requirements": "犬も来る場所。猫と犬を画像で分類する授業用試作品。固定容器の重さから水の残量を判断する。",
    "image": "assets/water.svg",
    "choices": [
      {
        "id": "best",
        "label": "AIカメラ＋重量センサ",
        "evaluation": "optimal",
        "information": "学習した猫・犬の画像分類と容器の重さ",
        "explanation": "動物の種類と残量を別々に判断できる。容器の重さを差し引き、猫が容器に乗る影響にも対策する。",
        "limitations": "容器の重さを差し引き、猫が容器に乗る影響にも対策する。"
      },
      {
        "id": "c0",
        "label": "AIカメラ＋水位センサ",
        "evaluation": "possible",
        "information": "画像分類と水面の高さ",
        "explanation": "実現可能だが、容器形状や水の付着に合わせた設置・校正が必要。",
        "limitations": "実現可能だが、容器形状や水の付着に合わせた設置・校正が必要。"
      },
      {
        "id": "c1",
        "label": "AIカメラだけ",
        "evaluation": "unsuitable",
        "information": "学習済み画像の分類",
        "explanation": "この構成では水の残量を測っていない。",
        "limitations": "この構成では水の残量を測っていない。"
      },
      {
        "id": "c2",
        "label": "重量センサだけ",
        "evaluation": "unsuitable",
        "information": "容器の重さ",
        "explanation": "来た動物が猫か犬かは分からない。",
        "limitations": "来た動物が猫か犬かは分からない。"
      },
      {
        "id": "c3",
        "label": "PIR型人感センサ",
        "evaluation": "unsuitable",
        "information": "赤外線量の変化",
        "explanation": "猫と犬の区別も水の残量も分からない。",
        "limitations": "猫と犬の区別も水の残量も分からない。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "動物の種類と残量を別々に判断できる。容器の重さを差し引き、猫が容器に乗る影響にも対策する。",
    "limitations": "容器の重さを差し引き、猫が容器に乗る影響にも対策する。",
    "learningPoint": "動物の種類と水の残量は別の情報。目的ごとに測定方法を分けよう。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。",
      "https://teachablemachine.withgoogle.com/"
    ]
  },
  {
    "id": "q7",
    "stage": 2,
    "title": "忘れ物防止装置",
    "scenario": "出発時刻に机の水筒が残っていたら知らせよう。",
    "requirements": "置く場所や水筒の見た目は変わる。他の物と区別する画像学習を使う。時計を利用できる。",
    "image": "assets/bottle.svg",
    "choices": [
      {
        "id": "best",
        "label": "AIカメラ＋時刻条件",
        "evaluation": "optimal",
        "information": "画像に水筒があるかの分類と時計の時刻",
        "explanation": "画像で物を区別し、プログラムで出発時刻を条件にする。時刻条件はセンサではない。照明や背景が変わると誤分類するため、複数の条件で学習・検証する。",
        "limitations": "照明・背景・見え方で誤分類することがある。"
      },
      {
        "id": "c0",
        "label": "複数の重量センサ＋時刻条件",
        "evaluation": "possible",
        "information": "机の場所ごとの重量と時刻",
        "explanation": "登録と配置の工夫で可能だが、同じ重さの物との区別や移動への対応が複雑。",
        "limitations": "登録と配置の工夫で可能だが、同じ重さの物との区別や移動への対応が複雑。"
      },
      {
        "id": "c1",
        "label": "AIカメラだけ",
        "evaluation": "unsuitable",
        "information": "学習した画像の分類",
        "explanation": "残っているかは分かるが、出発時刻の判断がない。",
        "limitations": "残っているかは分かるが、出発時刻の判断がない。"
      },
      {
        "id": "c2",
        "label": "時計だけ",
        "evaluation": "unsuitable",
        "information": "現在の時刻",
        "explanation": "水筒が残っているかは分からない。",
        "limitations": "水筒が残っているかは分からない。"
      },
      {
        "id": "c3",
        "label": "温度センサ＋時刻条件",
        "evaluation": "unsuitable",
        "information": "温度と時刻",
        "explanation": "水筒と他の物を安定して区別できない。",
        "limitations": "水筒と他の物を安定して区別できない。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "画像で物を区別し、プログラムで出発時刻を条件にする。時刻条件はセンサではない。照明や背景が変わると誤分類するため、複数の条件で学習・検証する。",
    "limitations": "照明・背景・見え方で誤分類することがある。",
    "learningPoint": "時刻条件はセンサではなく、時計の情報を使ったプログラムの判断。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。",
      "https://teachablemachine.withgoogle.com/"
    ]
  },
  {
    "id": "q8",
    "stage": 2,
    "title": "二度寝防止装置",
    "scenario": "アラーム停止後、ベッドに戻ったら再び知らせよう。",
    "requirements": "一人用ベッド。映像を撮らず、寝具の重さを差し引いて人の荷重を検出する。眠ったか自体は判定しない。",
    "image": "assets/bed.svg",
    "choices": [
      {
        "id": "best",
        "label": "ベッド脚の重量センサ＋時刻条件",
        "evaluation": "optimal",
        "information": "ベッドに加わる荷重とアラーム後の時間",
        "explanation": "映像なしでベッドへの帰還を検出できる。睡眠の判定ではなく在床の推定。荷重の校正が必要。",
        "limitations": "荷重の校正が必要。"
      },
      {
        "id": "c0",
        "label": "ベッド上の距離センサ＋時刻条件",
        "evaluation": "possible",
        "information": "寝具表面までの距離",
        "explanation": "実現可能だが、布団の形や姿勢による変化の調整が必要。",
        "limitations": "実現可能だが、布団の形や姿勢による変化の調整が必要。"
      },
      {
        "id": "c1",
        "label": "AIカメラ＋時刻条件",
        "evaluation": "unsuitable",
        "information": "画像に人がいるかの分類",
        "explanation": "在床推定は可能だが、この問題の映像を撮らない条件に合わない。",
        "limitations": "在床推定は可能だが、この問題の映像を撮らない条件に合わない。"
      },
      {
        "id": "c2",
        "label": "マイクだけ",
        "evaluation": "unsuitable",
        "information": "周囲の音",
        "explanation": "静かにベッドへ戻ったか分からない。",
        "limitations": "静かにベッドへ戻ったか分からない。"
      },
      {
        "id": "c3",
        "label": "明るさセンサ",
        "evaluation": "unsuitable",
        "information": "明るさ",
        "explanation": "在床も睡眠も分からない。",
        "limitations": "在床も睡眠も分からない。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "映像なしでベッドへの帰還を検出できる。睡眠の判定ではなく在床の推定。荷重の校正が必要。",
    "limitations": "荷重の校正が必要。",
    "learningPoint": "ベッド上の荷重は在床の手がかり。眠っていること自体は分からない。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。"
    ]
  },
  {
    "id": "q9",
    "stage": 2,
    "title": "置き配の盗難対策",
    "scenario": "荷物が入ったら施錠し、家族の操作で開けよう。",
    "requirements": "授業用ボックス。荷物の重さを検出し、登録済みの認証タグで解錠。実用の防犯性能は対象外。",
    "image": "assets/box.svg",
    "choices": [
      {
        "id": "best",
        "label": "重量センサ＋認証タグ",
        "evaluation": "optimal",
        "information": "荷物の荷重と登録済みタグの識別情報",
        "explanation": "荷物の検知と解錠の権限を分けられる。タグの紛失・複製や電源断への対策は別途必要。",
        "limitations": "タグの紛失・複製や電源断への対策は別途必要。"
      },
      {
        "id": "c0",
        "label": "赤外線遮光型＋認証タグ",
        "evaluation": "possible",
        "information": "光が遮られたかとタグの識別情報",
        "explanation": "実現可能だが、小さな荷物も光を遮るよう配置の工夫が必要。",
        "limitations": "実現可能だが、小さな荷物も光を遮るよう配置の工夫が必要。"
      },
      {
        "id": "c1",
        "label": "通常のAI画像分類による顔判定だけ",
        "evaluation": "unsuitable",
        "information": "学習画像との類似した分類",
        "explanation": "写真などで誤判定しうる。確実な本人認証として扱えず荷物も検知しない。",
        "limitations": "写真などで誤判定しうる。確実な本人認証として扱えず荷物も検知しない。"
      },
      {
        "id": "c2",
        "label": "重量センサだけ",
        "evaluation": "unsuitable",
        "information": "荷物の重さ",
        "explanation": "取り出す人の権限を確認できない。",
        "limitations": "取り出す人の権限を確認できない。"
      },
      {
        "id": "c3",
        "label": "誰でも押せる解錠ボタン",
        "evaluation": "unsuitable",
        "information": "ボタンが押されたか",
        "explanation": "家族だけの解錠にならない。",
        "limitations": "家族だけの解錠にならない。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "荷物の検知と解錠の権限を分けられる。タグの紛失・複製や電源断への対策は別途必要。",
    "limitations": "タグの紛失・複製や電源断への対策は別途必要。",
    "learningPoint": "荷物の検知と利用者の認証を分け、試作品と実用防犯の信頼性を区別しよう。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。"
    ]
  },
  {
    "id": "q10",
    "stage": 2,
    "title": "音による異常検知",
    "scenario": "設備の通常音と異常音を聞き分けて知らせよう。",
    "requirements": "授業用試作品。音量が同程度でも音の特徴が違う。通常・異常・背景音のデータを集められる。",
    "image": "assets/sound.svg",
    "choices": [
      {
        "id": "best",
        "label": "AIマイク（音声分類）",
        "evaluation": "optimal",
        "information": "マイクの音を学習済みモデルで分類した結果",
        "explanation": "Teachable Machine音声プロジェクトで特徴を学習する。未知の音・騒音・設置条件の変化では誤判定しうる。",
        "limitations": "未知の音・騒音・設置条件の変化では誤判定しうる。"
      },
      {
        "id": "c0",
        "label": "マイク＋周波数分析",
        "evaluation": "possible",
        "information": "音の周波数成分",
        "explanation": "実現可能だが、通常と異常を分ける特徴としきい値を自分で設計する必要がある。",
        "limitations": "実現可能だが、通常と異常を分ける特徴としきい値を自分で設計する必要がある。"
      },
      {
        "id": "c1",
        "label": "音量センサだけ",
        "evaluation": "unsuitable",
        "information": "音の大きさ",
        "explanation": "同じ音量で特徴が違う異常を区別できない。",
        "limitations": "同じ音量で特徴が違う異常を区別できない。"
      },
      {
        "id": "c2",
        "label": "温度センサだけ",
        "evaluation": "unsuitable",
        "information": "設備の温度",
        "explanation": "音だけに表れる異常を区別できない。",
        "limitations": "音だけに表れる異常を区別できない。"
      },
      {
        "id": "c3",
        "label": "加速度センサを机に設置",
        "evaluation": "unsuitable",
        "information": "机の振動",
        "explanation": "設備の音の特徴を直接取得できない。",
        "limitations": "設備の音の特徴を直接取得できない。"
      }
    ],
    "evaluation": "optimal",
    "explanation": "Teachable Machine音声プロジェクトで特徴を学習する。未知の音・騒音・設置条件の変化では誤判定しうる。",
    "limitations": "未知の音・騒音・設置条件の変化では誤判定しうる。",
    "learningPoint": "音量と音の特徴は別の情報。AIでも未知の音や騒音を含めて検証しよう。",
    "sourceNotes": [
      "授業用に条件を設定した比較。特定製品の採用方式を断定しない。",
      "https://teachablemachine.withgoogle.com/"
    ]
  }
];
