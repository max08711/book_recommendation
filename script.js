// 画像と音声のベースパス
const audioBasePath = "config/mp3/";
const imageBasePath = "config/images/";

const validUsers = [
    {
        username: "mi-terauchi@exedy.com",
        password: "miyu08711",
        robots: [{ id: "multi2" }, { id: "multi4" }, { id: "SR05_2502110006" }],
    },
    {
        username: "exedy",
        password: "exedy_admin",
        robots: [{ id: "multi2" }, { id: "SR05_2502110006" }],
    },
    {
        username: "1111",
        password: "1111",
        robots: [{ id: "multi2" }, { id: "SR05_2502110006" }],
    },
];

let currentUser = null; // ログイン中ユーザー
let selectedRobot = null; // 選択されたロボットID
// 本の画像パス
const bookImages = {
    コンロ1つで自炊Lesson: `${imageBasePath}コンロ1つで自炊Lesson.jpg`,
    ニッポンのおみくじ: `${imageBasePath}ニッポンのおみくじ.jpg`,
    "レフ筋トレ 最高に動ける体をつくる": `${imageBasePath}レフ筋トレ 最高に動ける体をつくる.jpg`,
    思わずためしてみたくなるマンガ心理学１年生: `${imageBasePath}思わずためしてみたくなるマンガ心理学１年生.jpg`,
    星をつなぐ手: `${imageBasePath}星をつなぐ手.jpg`,
    "待ち活/33": `${imageBasePath}待ち活33.jpg`,
    東京タワー: `${imageBasePath}東京タワー2.jpg`,
    "旅行が200％楽しくなる！スーツケース収納術": `${imageBasePath}旅行が200％楽しくなる！スーツケース収納術.jpg`,
};

// 本の説明
const bookDescriptions = {
    コンロ1つで自炊Lesson: "ひとり暮らしでよくある、コンロがひとつしかない。シンクが小さい・狭いを解決。コンロ1つでラクにおいしい料理を作るコツを教えてくれる1冊です。",
    ニッポンのおみくじ: "日本全国232種のおみくじを紹介。楽しく引ける。人生に役に立つ。あなただけに寄り添う導きの言葉を見つけに行きませんか。",
    "レフ筋トレ 最高に動ける体をつくる":
        "非常にやわらかで機能性に優れた筋肉をつくるトレーニング「レフ筋トレ」。身体の滑らかな動きを妨げない柔らかい筋肉を手に入れるための独自のトレーニングが詰まった1冊です。",
    思わずためしてみたくなるマンガ心理学１年生: "バイト先や学校など、あらゆるシーンで使える心理学が4コママンガで紹介されています。仕事や恋愛に関わる心理学を学べる1冊です。",
    星をつなぐ手: "2017年に本屋大賞にノミネートされた『桜風堂ものがたり』の続編です。作中に出てくる星祭りの幻想的な描写がとても印象に残ります。",
    "待ち活/33": "K-POPアイドルの兵役期間をファンがより楽しむためのアイデアが満載の1冊です。推しへの愛を深めるためのヒントが盛りだくさんです。",
    東京タワー: "大学生の透と耕二は、それぞれ夫がいる年上の女性と関係を持ってしまう。しかも、耕二には彼女が…。この2組はどうなるのか。意外な結末に注目です！",
    "旅行が200％楽しくなる！スーツケース収納術": "旅行で大変といえばパッキング！服やお土産でかさばりがち。この本では収納術をご紹介。パッキングのヒントになります。",
};

// おすすめ文
const recommendations = {
    コンロ1つで自炊Lesson: "金丸絵里加『コンロ1つで自炊Lesson』",
    ニッポンのおみくじ: "鏑木麻矢『ニッポンのおみくじ』",
    レフ筋トレ: "高岡英夫『レフ筋トレ 最高に動ける体をつくる』",
    マンガ心理学: "齊藤勇『思わずためしてみたくなるマンガ心理学１年生』",
    星をつなぐ手: "村山早紀『星をつなぐ手』",
    "待ち活/33": "間木まき『待ち活/33』",
    東京タワー: "江國香織『東京タワー』",
    スーツケース収納術: "三田村蕗子『旅行が200％楽しくなる！スーツケース収納術』",
};

// 音声ファイルパス
const audioFiles = {
    startQuiz: `${audioBasePath}quiz.mp3`,
    selectOption: `${audioBasePath}kettei.mp3`,
    finalPage: `${audioBasePath}last.mp3`,
    tokyo: `${audioBasePath}tokyo.mp3`,
    shinrigaku: `${audioBasePath}shinrigaku.mp3`,
    ryokou: `${audioBasePath}ryokou.mp3`,
    hoshi: `${audioBasePath}hoshi.mp3`,
    omikuzi: `${audioBasePath}omikuzi.mp3`,
    zisui: `${audioBasePath}zisui.mp3`,
    matikatu: `${audioBasePath}matikatu.mp3`,
    refukintore: `${audioBasePath}refukintore.mp3`,
};

const questionAudioFiles = {
    0: `${audioBasePath}q1.mp3`,
    1: `${audioBasePath}q2.mp3`,
    2: `${audioBasePath}q3.mp3`,
    3: `${audioBasePath}q4.mp3`,
    4: `${audioBasePath}q5.mp3`,
};

const questions = [
    {
        question: "今あなたが一番したいことは？",
        options: [
            { text: "新しいことを学びたい", next: 1 },
            { text: "リラックスしたい", next: 3 },
        ],
    },
    {
        question: "どんなスキルを伸ばしたいですか？",
        options: [
            { text: "日常的に役立つスキル", next: 2 },
            { text: "心や体を成長させたい", recommendation: "高岡英夫『レフ筋トレ 最高に動ける体をつくる』" },
            { text: "心理学や人の行動", recommendation: "齊藤勇『思わずためしてみたくなるマンガ心理学１年生』" },
        ],
    },
    {
        question: "どんなテーマが気になりますか？",
        options: [
            { text: "料理や家事", recommendation: "金丸絵里加『コンロ1つで自炊Lesson』" },
            { text: "旅行", recommendation: "三田村蕗子『旅行が200％楽しくなる！スーツケース収納術』" },
            { text: "待ち時間の使い方", recommendation: "間木まき『待ち活/33』" },
        ],
    },
    {
        question: "物語や文学に触れたい気分ですか？",
        options: [
            { text: "物語を読みたい", next: 4 },
            { text: "日本の文化について知りたい", recommendation: "鏑木麻矢『ニッポンのおみくじ』" },
        ],
    },
    {
        question: "現実的な話と幻想的な話、どちらが好きですか？",
        options: [
            { text: "現実的な話", recommendation: "江國香織『東京タワー』" },
            { text: "幻想的で夢のある話", recommendation: "村山早紀『星をつなぐ手』" },
        ],
    },
];

// オーディオ再生関数
function playAudio(file, callback = null) {
    const audio = new Audio(file);
    audio.play();
    if (callback) {
        audio.addEventListener("ended", callback);
    }
}

// クイズ開始ボタン
document.getElementById("start-button").onclick = function () {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz").style.display = "flex";
    playAudio(audioFiles.startQuiz, () => displayQuestion(0));
};

// ホームボタン（クイズ画面時）
document.getElementById("home-button").onclick = function () {
    location.reload();
};

// 質問表示
function displayQuestion(index) {
    const questionData = questions[index];
    document.getElementById("question").innerText = questionData.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    questionData.options.forEach((option) => {
        const button = document.createElement("div");
        button.className = "option";
        button.innerText = option.text;
        button.onclick = () => {
            playAudio(audioFiles.selectOption, () => {
                if (option.recommendation) {
                    displayRecommendation(option.recommendation);
                } else if (option.next !== undefined) {
                    displayQuestion(option.next);
                }
            });
        };
        optionsContainer.appendChild(button);
    });

    playAudio(questionAudioFiles[index]);
}

// 推薦本表示
function displayRecommendation(recommendation) {
    const [author, titleRaw] = recommendation.split("『");
    const title = titleRaw ? titleRaw.trim().replace("』", "") : "";

    const imageUrl = bookImages[title];
    const description = bookDescriptions[title];

    document.getElementById("quiz").innerHTML = `
        <div class="question">
            <div>${author}</div>
            <div>『${title}』</div>
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="margin-top: 20px; width: 700px; border-radius: 10px;">` : ""}
            ${description ? `<div style="margin-top: 20px; font-size: 1em; text-align: justify;">${description}</div>` : ""}
        </div>
        <div style="margin-top: 30px; text-align: center;">
            <button id="home-button" style="background-color: #6c757d; color: #fff; border: none; padding: 10px 40px; font-size: 1.5em; border-radius: 10px; cursor: pointer;">ホーム</button>
        </div>
    `;

    document.getElementById("home-button").onclick = function () {
        playAudio(audioFiles.selectOption, () => location.reload());
    };

    // 最後のページで「ジャジャーン.mp3」を再生した後、本に応じた音声を再生
    playAudio(audioFiles.finalPage, () => {
        if (title === "東京タワー") {
            playAudio(audioFiles.tokyo);
        } else if (title === "マンガ心理学") {
            playAudio(audioFiles.shinrigaku);
        } else if (title === "スーツケース収納術") {
            playAudio(audioFiles.ryokou);
        } else if (title === "星をつなぐ手") {
            playAudio(audioFiles.hoshi);
        } else if (title === "ニッポンのおみくじ") {
            playAudio(audioFiles.omikuzi);
        } else if (title === "コンロ1つで自炊Lesson") {
            playAudio(audioFiles.zisui);
        } else if (title === "待ち活/33") {
            playAudio(audioFiles.matikatu);
        } else if (title === "レフ筋トレ") {
            playAudio(audioFiles.refukintore);
        }
    });
}

// トップページの画像クリック
document.querySelectorAll(".book-image").forEach((image) => {
    image.addEventListener("click", () => {
        const recommendation = recommendations[image.alt];
        if (recommendation) {
            document.getElementById("start-container").style.display = "none";
            document.getElementById("quiz").style.display = "flex";
            playAudio(audioFiles.finalPage, () => {
                const title = image.alt;
                if (title === "東京タワー") {
                    playAudio(audioFiles.tokyo);
                } else if (title === "マンガ心理学") {
                    playAudio(audioFiles.shinrigaku);
                } else if (title === "スーツケース収納術") {
                    playAudio(audioFiles.ryokou);
                } else if (title === "星をつなぐ手") {
                    playAudio(audioFiles.hoshi);
                } else if (title === "ニッポンのおみくじ") {
                    playAudio(audioFiles.omikuzi);
                } else if (title === "コンロ1つで自炊Lesson") {
                    playAudio(audioFiles.zisui);
                } else if (title === "待ち活/33") {
                    playAudio(audioFiles.matikatu);
                } else if (title === "レフ筋トレ") {
                    playAudio(audioFiles.refukintore);
                }
            });
            displayRecommendation(recommendation);
        } else {
            console.error("Recommendation not found for image alt:", image.alt);
        }
    });
});
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const loginmessage = document.getElementById("loginmessage");
    const loginPopup = document.getElementById("loginPopup");

    // validUsers から一致するユーザーを探す
    const user = validUsers.find((u) => u.username === username && u.password === password);

    if (user) {
        // ログイン成功
        currentUser = user;
        loginmessage.textContent = "ログイン成功！";
        loginmessage.style.color = "#38a169";

        // ログインポップアップを閉じる
        loginPopup.style.display = "none";

        // ロボット選択ポップアップを表示
        showRobotPopupForUser(user);
    } else {
        // ログイン失敗
        loginmessage.textContent = "ユーザー名またはパスワードが間違っています。";
        loginmessage.style.color = "#e53e3e";
    }
});

// 👁 パスワードの表示／非表示切り替え
document.addEventListener("DOMContentLoaded", function () {
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);

        // アイコン切り替え（fa-eye ↔ fa-eye-slash）
        this.innerHTML = type === "password" ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
    });
});

document.getElementById("select-btn").addEventListener("click", function () {
    const select = document.getElementById("robot-select");
    const value = select.value;
    const message = document.getElementById("message");
    const robotPopup = document.getElementById("robotPopup");

    if (value) {
        selectedRobot = value; // グローバルに保存
        message.textContent = `選択されたロボット: ${value}`;
        message.style.color = "#38a169";

        // ここでポップアップを閉じる
        robotPopup.style.display = "none";

        // ここから先はお好み：
        // - 会話アプリを起動する
        // - サーバにロボットIDを送る
        //
        // 例: サーバに送る場合
        // fetch(`${SERVER_URL}/set_robot`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ username: currentUser.username, robot_id: selectedRobot })
        // });
    } else {
        message.textContent = "ロボットを選択してください。";
        message.style.color = "#e53e3e";
    }
});

function findUserByUsername(username) {
    if (!validUsers) return null;
    return validUsers.find((u) => u.username === username);
}

function showRobotPopupForUser(user) {
    const robotPopup = document.getElementById("robotPopup");
    const robotSelect = document.getElementById("robot-select");
    const message = document.getElementById("message");

    // いったん初期化
    robotSelect.innerHTML = '<option value="">選択してください</option>';
    message.textContent = "";

    if (!user || !Array.isArray(user.robots)) {
        message.textContent = "このユーザーに紐づくロボットが設定されていません。";
        message.style.color = "#e53e3e";
        robotPopup.style.display = "flex";
        return;
    }

    // users.json にあるロボット情報を option に追加
    user.robots.forEach((robot) => {
        const opt = document.createElement("option");
        opt.value = robot.id; // 内部で使うID
        opt.textContent = robot.label || robot.id; // 表示名
        robotSelect.appendChild(opt);
    });

    robotPopup.style.display = "flex";
}
