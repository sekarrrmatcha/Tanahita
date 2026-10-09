// =========================================================
// TANAHITA — SCRIPT.JS FULL
// Modul 1: Kenali Tanahmu
// Modul 2: Lindungi Tanahmu
// Modul Erosi: Kenali & Bedakan Erosi
// Modul 3: Jaga Hasil Panenmu
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // 1. SMOOTH SCROLL
    // =====================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // =====================================================
    // 2. MODUL TANAH — SOIL TEXTURE QUIZ
    // =====================================================

    const soilQuestions = document.querySelectorAll(".soil-question");
    const soilAnswerButtons = document.querySelectorAll(".answer-option");
    const soilProgressSteps = document.querySelectorAll(".test-step");

    const soilResultBox = document.getElementById("soilTestResult");
    const soilResultText = document.getElementById("soilResultText");
    const soilResultDescription =
        document.getElementById("soilResultDescription");
    const resetSoilTest = document.getElementById("resetSoilTest");

    let currentSoilQuestion = 0;

    const soilAnswers = {
        1: null,
        2: null,
        3: null
    };

    const soilResults = {
        sandy: {
            title: "Tanahmu cenderung berpasir 🏖️",
            description:
                "Tanah berpasir biasanya terasa lebih kasar dan memiliki kemampuan menahan air yang relatif rendah. Air cenderung lebih cepat mengalir melewati ruang antarpartikel tanah."
        },

        clay: {
            title: "Tanahmu cenderung berliat 🟤",
            description:
                "Tanah berliat memiliki partikel yang sangat halus sehingga cenderung menahan air lebih lama. Tanah ini juga dapat terasa lengket ketika basah."
        },

        loam: {
            title: "Tanahmu cenderung lempung 🌱",
            description:
                "Tanah lempung memiliki perpaduan partikel pasir, debu, dan liat sehingga umumnya memiliki keseimbangan antara kemampuan menahan air dan drainase."
        }
    };

    function showSoilQuestion(index) {
        soilQuestions.forEach((question, questionIndex) => {
            question.classList.toggle(
                "active",
                questionIndex === index
            );
        });

        soilProgressSteps.forEach((step, stepIndex) => {
            step.classList.toggle(
                "active",
                stepIndex === index
            );
        });
    }

    function calculateSoilResult() {
        let sandyScore = 0;
        let clayScore = 0;
        let loamScore = 0;

        Object.values(soilAnswers).forEach(answer => {
            if (answer === "sandy") sandyScore++;
            if (answer === "clay") clayScore++;
            if (answer === "loam") loamScore++;
        });

        const scores = {
            sandy: sandyScore,
            clay: clayScore,
            loam: loamScore
        };

        return Object.keys(scores).reduce((a, b) =>
            scores[a] > scores[b] ? a : b
        );
    }

    function showSoilResult() {
        const result = calculateSoilResult();
        const resultData = soilResults[result];

        if (!resultData) return;

        if (soilResultText) {
            soilResultText.textContent = resultData.title;
        }

        if (soilResultDescription) {
            soilResultDescription.textContent =
                resultData.description;
        }

        if (soilResultBox) {
            soilResultBox.classList.add("active");

            setTimeout(() => {
                soilResultBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 100);
        }
    }

    soilAnswerButtons.forEach(button => {
        button.addEventListener("click", function () {
            const questionElement =
                this.closest(".soil-question");

            if (!questionElement) return;

            const questionNumber =
                questionElement.dataset.question ||
                questionElement.getAttribute("data-question");

            const answer =
                this.dataset.answer ||
                this.getAttribute("data-answer");

            if (!questionNumber || !answer) return;

            soilAnswers[questionNumber] = answer;

            questionElement
                .querySelectorAll(".answer-option")
                .forEach(option => {
                    option.classList.remove("selected");
                });

            this.classList.add("selected");

            if (currentSoilQuestion < soilQuestions.length - 1) {
                currentSoilQuestion++;

                setTimeout(() => {
                    showSoilQuestion(currentSoilQuestion);
                }, 250);
            } else {
                setTimeout(showSoilResult, 250);
            }
        });
    });

    if (resetSoilTest) {
        resetSoilTest.addEventListener("click", function () {
            currentSoilQuestion = 0;

            soilAnswers[1] = null;
            soilAnswers[2] = null;
            soilAnswers[3] = null;

            soilAnswerButtons.forEach(button => {
                button.classList.remove("selected");
            });

            if (soilResultBox) {
                soilResultBox.classList.remove("active");
            }

            showSoilQuestion(0);
        });
    }

    if (soilQuestions.length > 0) {
        showSoilQuestion(0);
    }


    // =====================================================
    // 3. MODUL TANAH — PLANT INTERACTION
    // =====================================================

    const plantButtons =
        document.querySelectorAll(".plant-button");
    const plantPanels =
        document.querySelectorAll(".plant-panel");

    plantButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedPlant = this.dataset.plant;

            if (!selectedPlant) return;

            plantButtons.forEach(item => {
                item.classList.remove("active");
            });

            plantPanels.forEach(panel => {
                panel.classList.remove("active");
            });

            this.classList.add("active");

            const targetPanel = document.querySelector(
                `[data-plant-panel="${selectedPlant}"]`
            );

            if (targetPanel) {
                targetPanel.classList.add("active");
            }
        });
    });

    const defaultPlantButton =
        document.querySelector(".plant-button.active");

    if (defaultPlantButton) {
        const defaultPlant =
            defaultPlantButton.dataset.plant;

        const defaultPanel = document.querySelector(
            `[data-plant-panel="${defaultPlant}"]`
        );

        if (defaultPanel) {
            defaultPanel.classList.add("active");
        }
    }


    // =====================================================
    // 4. MODUL EROSI — DETAIL JENIS EROSI
    // =====================================================

    const erosionDetailButtons =
        document.querySelectorAll(".erosion-detail-button");

    const erosionDetailPanel =
        document.getElementById("erosionDetailPanel");

    const erosionDetailIcon =
        document.getElementById("erosionDetailIcon");

    const erosionDetailTitle =
        document.getElementById("erosionDetailTitle");

    const erosionDetailText =
        document.getElementById("erosionDetailText");

    const erosionDetailNote =
        document.getElementById("erosionDetailNote");

    // Data mengikuti struktur dan istilah yang dipakai
    // pada erosi.html.
    const erosionDetails = {
        percikan: {
            icon: "🌧️",
            title: "Erosi Percikan",
            text:
                "Butir hujan mengenai permukaan tanah dan melepaskan atau memindahkan partikel tanah.",
            note:
                "Ciri sederhana: permukaan tanah terbuka dan agregat dapat terpecah akibat hantaman butir hujan."
        },

        lembar: {
            icon: "🟤",
            title: "Erosi Lembar",
            text:
                "Lapisan tanah permukaan terkikis secara relatif merata sehingga bentuknya sering sulit terlihat.",
            note:
                "Ciri sederhana: kehilangan lapisan permukaan berlangsung relatif merata dan tidak membentuk saluran yang jelas."
        },

        alur: {
            icon: "〰️",
            title: "Erosi Alur",
            text:
                "Aliran permukaan terkonsentrasi dan membentuk alur kecil serta dangkal.",
            note:
                "Ciri sederhana: terlihat alur kecil dan dangkal pada permukaan tanah."
        },

        parit: {
            icon: "🌊",
            title: "Erosi Parit",
            text:
                "Aliran permukaan yang semakin terkonsentrasi dapat membentuk saluran yang lebih besar dan dalam.",
            note:
                "Ciri sederhana: saluran erosi lebih besar dan dalam dibandingkan erosi alur."
        },

        tebing: {
            icon: "🏞️",
            title: "Erosi Tebing Sungai",
            text:
                "Tepian sungai dapat mengalami pengikisan akibat aliran air yang bekerja pada bagian tebing.",
            note:
                "Ciri sederhana: pengikisan terlihat pada tepian atau tebing sungai."
        },

        longsor: {
            icon: "⛰️",
            title: "Longsor",
            text:
                "Pergerakan massa tanah dalam volume besar pada lereng.",
            note:
                "Ciri sederhana: perpindahan massa tanah terjadi pada lereng."
        },

        internal: {
            icon: "🕳️",
            title: "Erosi Internal",
            text:
                "Butir tanah dapat berpindah melalui celah atau pori di dalam tanah.",
            note:
                "Ciri sederhana: perpindahan material berlangsung melalui bagian dalam tanah."
        }
    };

    erosionDetailButtons.forEach(button => {
        button.addEventListener("click", function () {
            const target = this.dataset.target;

            const data = erosionDetails[target];

            if (!data) return;

            erosionDetailButtons.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            if (erosionDetailIcon) {
                erosionDetailIcon.textContent = data.icon;
            }

            if (erosionDetailTitle) {
                erosionDetailTitle.textContent = data.title;
            }

            if (erosionDetailText) {
                erosionDetailText.textContent = data.text;
            }

            if (erosionDetailNote) {
                erosionDetailNote.textContent = data.note;
            }

            if (erosionDetailPanel) {
                erosionDetailPanel.classList.add("active");

                setTimeout(() => {
                    erosionDetailPanel.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }, 100);
            }
        });
    });


    // =====================================================
    // 5. MODUL EROSI — KUIS 3 SOAL
    // =====================================================

    const erosionQuizQuestions =
        document.querySelectorAll(".erosion-quiz-question");

    const erosionQuizOptions =
        document.querySelectorAll(".erosion-quiz-option");

    const erosionQuizResult =
        document.getElementById("erosionQuizResult");

    const erosionQuizScore =
        document.getElementById("erosionQuizScore");

    const erosionQuizMessage =
        document.getElementById("erosionQuizMessage");

    const resetErosionQuiz =
        document.getElementById("resetErosionQuiz");

    // Jawaban mengikuti soal yang ada di erosi.html:
    // 1 = alur
    // 2 = parit
    // 3 = tebing
    const erosionQuizAnswers = {
        1: "alur",
        2: "parit",
        3: "tebing"
    };

    let erosionQuizCurrent = 1;
    let erosionQuizCorrect = 0;
    let erosionQuizAnswered = false;

    function showErosionQuestion(number) {
        erosionQuizQuestions.forEach(question => {
            const questionNumber =
                question.dataset.quizQuestion;

            question.classList.toggle(
                "active",
                String(questionNumber) === String(number)
            );
        });

        erosionQuizCurrent = number;
        erosionQuizAnswered = false;
    }

    function showErosionQuizResult() {
        if (!erosionQuizResult) return;

        if (erosionQuizScore) {
            erosionQuizScore.textContent =
                `${erosionQuizCorrect} / ${erosionQuizQuestions.length}`;
        }

        if (erosionQuizMessage) {
            if (erosionQuizCorrect === erosionQuizQuestions.length) {
                erosionQuizMessage.textContent =
                    "Mantap! Kamu sudah bisa membedakan bentuk erosi dengan baik. 🌱";
            } else if (erosionQuizCorrect >= 2) {
                erosionQuizMessage.textContent =
                    "Bagus! Tinggal sedikit lagi. Coba perhatikan lagi bentuk pengikisan tanahnya.";
            } else {
                erosionQuizMessage.textContent =
                    "Yuk coba lagi dan perhatikan bentuk pengikisan tanahnya.";
            }
        }

        erosionQuizResult.classList.add("active");

        setTimeout(() => {
            erosionQuizResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);
    }

    erosionQuizOptions.forEach(button => {
        button.addEventListener("click", function () {
            if (erosionQuizAnswered) return;

            const questionElement =
                this.closest(".erosion-quiz-question");

            if (!questionElement) return;

            const questionNumber =
                questionElement.dataset.quizQuestion;

            const selectedAnswer =
                this.dataset.answer;

            const correctAnswer =
                erosionQuizAnswers[questionNumber];

            if (!correctAnswer || !selectedAnswer) return;

            erosionQuizAnswered = true;

            const options =
                questionElement.querySelectorAll(
                    ".erosion-quiz-option"
                );

            options.forEach(option => {
                option.disabled = true;
                option.classList.remove(
                    "correct",
                    "wrong"
                );
            });

            const feedback =
                questionElement.querySelector(
                    ".quiz-feedback"
                );

            if (selectedAnswer === correctAnswer) {
                erosionQuizCorrect++;

                this.classList.add("correct");

                if (feedback) {
                    feedback.textContent =
                        "Benar! 🌱";
                }
            } else {
                this.classList.add("wrong");

                const correctButton =
                    questionElement.querySelector(
                        `.erosion-quiz-option[data-answer="${correctAnswer}"]`
                    );

                if (correctButton) {
                    correctButton.classList.add("correct");
                }

                if (feedback) {
                    feedback.textContent =
                        "Belum tepat. Perhatikan bentuk pengikisan pada foto.";
                }
            }

            setTimeout(() => {
                const nextQuestion =
                    Number(questionNumber) + 1;

                if (
                    nextQuestion <=
                    erosionQuizQuestions.length
                ) {
                    showErosionQuestion(nextQuestion);
                } else {
                    showErosionQuizResult();
                }
            }, 650);
        });
    });

    if (resetErosionQuiz) {
        resetErosionQuiz.addEventListener("click", function () {
            erosionQuizCurrent = 1;
            erosionQuizCorrect = 0;
            erosionQuizAnswered = false;

            erosionQuizOptions.forEach(button => {
                button.disabled = false;
                button.classList.remove(
                    "correct",
                    "wrong"
                );
            });

            document
                .querySelectorAll(".quiz-feedback")
                .forEach(feedback => {
                    feedback.textContent = "";
                });

            if (erosionQuizResult) {
                erosionQuizResult.classList.remove("active");
            }

            if (erosionQuizQuestions.length > 0) {
                showErosionQuestion(1);
            }
        });
    }

    if (erosionQuizQuestions.length > 0) {
        showErosionQuestion(1);
    }


    // =====================================================
    // 6. MODUL 3 — IDENTIFIKASI HASIL PANEN
    // =====================================================

    const damageButtons =
        document.querySelectorAll(".damage-button");

    const damageResult =
        document.getElementById("damageResult");

    const damageIcon =
        document.getElementById("damageIcon");

    const damageTitle =
        document.getElementById("damageTitle");

    const damageDescription =
        document.getElementById("damageDescription");

    const damageTips =
        document.getElementById("damageTips");

    const damageData = {
        matang: {
            icon: "🍌",
            title: "Hasil panen cepat matang",
            description:
                "Pematangan yang berlangsung cepat dapat berkaitan dengan kondisi suhu dan proses fisiologis hasil panen. Etilen juga berperan dalam proses pematangan pada komoditas tertentu.",
            tips: [
                "Perhatikan suhu penyimpanan",
                "Perhatikan tingkat kematangan",
                "Pertimbangkan etilen"
            ]
        },

        layu: {
            icon: "🥬",
            title: "Hasil panen cepat layu",
            description:
                "Kelayuan umumnya berkaitan dengan kehilangan air. Kondisi penyimpanan yang terlalu kering dapat mempercepat kehilangan air dari jaringan hasil panen.",
            tips: [
                "Perhatikan kelembapan",
                "Kurangi kehilangan air",
                "Hindari penanganan berlebihan"
            ]
        },

        busuk: {
            icon: "🟤",
            title: "Muncul bercak atau pembusukan",
            description:
                "Kerusakan fisik dapat membuka peluang bagi mikroorganisme seperti jamur dan bakteri. Kondisi yang terlalu lembap juga dapat meningkatkan risiko kerusakan.",
            tips: [
                "Pilah hasil yang rusak",
                "Hindari luka dan benturan",
                "Perhatikan kelembapan"
            ]
        },

        kering: {
            icon: "💧",
            title: "Hasil panen menyusut atau kering",
            description:
                "Penyusutan dan kekeringan dapat terjadi ketika hasil panen kehilangan air terlalu banyak selama penanganan atau penyimpanan.",
            tips: [
                "Perhatikan kelembapan",
                "Kurangi kehilangan air",
                "Gunakan penyimpanan yang sesuai"
            ]
        },

        lunak: {
            icon: "🍅",
            title: "Tekstur menjadi terlalu lunak",
            description:
                "Perubahan tekstur dapat berkaitan dengan proses pematangan dan kondisi penyimpanan. Benturan atau tekanan juga dapat mempercepat kerusakan jaringan.",
            tips: [
                "Perhatikan tingkat kematangan",
                "Hindari tekanan",
                "Perhatikan suhu"
            ]
        }
    };

    damageButtons.forEach(button => {
        button.addEventListener("click", function () {
            const problem = this.dataset.problem;
            const data = damageData[problem];

            if (!data) return;

            damageButtons.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            if (damageIcon) {
                damageIcon.textContent = data.icon;
            }

            if (damageTitle) {
                damageTitle.textContent = data.title;
            }

            if (damageDescription) {
                damageDescription.textContent =
                    data.description;
            }

            if (damageTips) {
                damageTips.innerHTML =
                    data.tips.map(tip => `
                        <span class="damage-tip">
                            ✓ ${tip}
                        </span>
                    `).join("");
            }

            if (damageResult) {
                damageResult.classList.add("active");

                setTimeout(() => {
                    damageResult.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }, 100);
            }
        });
    });


    // =====================================================
    // 7. MODUL 3 — PETA KOMODITAS & PENYIMPANAN
    // =====================================================

    if (document.body.classList.contains("postharvest-page")) {

        const commodityGrid = document.getElementById("commodityGrid");
        const commodityDetail = document.getElementById("commodityDetail");
        const commodityDetailIcon = document.getElementById("commodityDetailIcon");
        const commodityDetailCategory = document.getElementById("commodityDetailCategory");
        const commodityDetailTitle = document.getElementById("commodityDetailTitle");
        const commodityStorageBadge = document.getElementById("commodityStorageBadge");
        const commodityDetailText = document.getElementById("commodityDetailText");
        const commodityStore = document.getElementById("commodityStore");
        const commodityWatch = document.getElementById("commodityWatch");
        const commodityAvoid = document.getElementById("commodityAvoid");
        const commodityTip = document.getElementById("commodityTip");
        const commodityFilters = document.querySelectorAll(".commodity-filter");

        if (commodityGrid) {

            if (!document.getElementById("tanahita-commodity-style")) {
                const style = document.createElement("style");
                style.id = "tanahita-commodity-style";
                style.textContent = `
                    .commodity-intro-note {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        gap: 16px;
                        align-items: start;
                        margin: 28px 0 24px;
                        padding: 18px 20px;
                        border: 1px solid rgba(67, 91, 65, .14);
                        border-radius: 18px;
                        background: rgba(255, 255, 255, .7);
                        box-shadow: 0 12px 30px rgba(39, 57, 39, .06);
                    }

                    .commodity-intro-note > span {
                        font-size: 1.7rem;
                        line-height: 1;
                    }

                    .commodity-intro-note strong {
                        display: block;
                        margin-bottom: 5px;
                    }

                    .commodity-intro-note p {
                        margin: 0;
                        line-height: 1.7;
                    }

                    .commodity-filters {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                        margin: 24px 0;
                    }

                    .commodity-filter {
                        border: 1px solid rgba(67, 91, 65, .18);
                        background: #fff;
                        border-radius: 999px;
                        padding: 10px 15px;
                        font: inherit;
                        cursor: pointer;
                        transition: transform .18s ease, background .18s ease, color .18s ease, box-shadow .18s ease;
                    }

                    .commodity-filter:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 18px rgba(39, 57, 39, .08);
                    }

                    .commodity-filter.active {
                        background: #2f5130;
                        color: #fff;
                        border-color: #2f5130;
                    }

                    .commodity-grid {
                        display: grid;
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                        gap: 14px;
                    }

                    .commodity-card {
                        appearance: none;
                        border: 1px solid rgba(67, 91, 65, .13);
                        background: rgba(255, 255, 255, .82);
                        border-radius: 20px;
                        padding: 17px;
                        text-align: left;
                        cursor: pointer;
                        min-height: 132px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease, background .2s ease;
                        animation: thCommodityIn .42s ease both;
                    }

                    .commodity-card:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 14px 30px rgba(39, 57, 39, .09);
                    }

                    .commodity-card.active {
                        border-color: rgba(47, 81, 48, .55);
                        background: #f5f8f1;
                        box-shadow: 0 14px 32px rgba(47, 81, 48, .12);
                    }

                    .commodity-card-icon {
                        font-size: 2rem;
                        line-height: 1;
                        margin-bottom: 14px;
                    }

                    .commodity-card-name {
                        margin: 0 0 5px;
                        font-size: 1.02rem;
                        font-weight: 700;
                    }

                    .commodity-card-category {
                        margin: 0;
                        font-size: .76rem;
                        letter-spacing: .08em;
                        text-transform: uppercase;
                        opacity: .62;
                    }

                    .commodity-detail {
                        margin-top: 22px;
                        display: grid;
                        grid-template-columns: 180px 1fr;
                        gap: 24px;
                        align-items: stretch;
                        padding: 24px;
                        border-radius: 26px;
                        border: 1px solid rgba(67, 91, 65, .14);
                        background: linear-gradient(135deg, rgba(255,255,255,.94), rgba(242,247,237,.88));
                        box-shadow: 0 18px 38px rgba(39, 57, 39, .08);
                        animation: thCommodityDetail .5s ease both;
                    }

                    .commodity-detail-refresh {
                        animation: none;
                    }

                    .commodity-detail-refresh.is-refreshing {
                        animation: thCommodityDetail .5s ease both;
                    }

                    .commodity-detail-visual {
                        min-height: 190px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        border-radius: 22px;
                        background: rgba(255,255,255,.72);
                        border: 1px solid rgba(67,91,65,.1);
                    }

                    .commodity-detail-icon {
                        font-size: 5rem;
                        line-height: 1;
                        animation: thCommodityFloat 3s ease-in-out infinite;
                    }

                    .commodity-detail-visual > span {
                        font-size: .72rem;
                        letter-spacing: .12em;
                        font-weight: 800;
                        opacity: .6;
                    }

                    .commodity-detail-heading {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        gap: 18px;
                    }

                    .commodity-detail-heading h3 {
                        margin: 3px 0 0;
                        font-size: clamp(1.6rem, 3vw, 2.35rem);
                    }

                    .commodity-storage-badge {
                        flex: 0 0 auto;
                        padding: 8px 11px;
                        border-radius: 999px;
                        background: rgba(47,81,48,.1);
                        color: #2f5130;
                        font-size: .7rem;
                        font-weight: 800;
                        letter-spacing: .08em;
                    }

                    .commodity-detail-content > p {
                        margin: 14px 0 18px;
                        line-height: 1.75;
                    }

                    .commodity-detail-grid {
                        display: grid;
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                        gap: 12px;
                    }

                    .commodity-detail-grid > div {
                        padding: 14px;
                        border-radius: 16px;
                        background: rgba(255,255,255,.72);
                        border: 1px solid rgba(67,91,65,.09);
                    }

                    .commodity-detail-grid span {
                        display: block;
                        margin-bottom: 7px;
                        font-size: .68rem;
                        letter-spacing: .08em;
                        font-weight: 800;
                        opacity: .62;
                    }

                    .commodity-detail-grid strong {
                        display: block;
                        line-height: 1.55;
                        font-size: .92rem;
                    }

                    .commodity-detail-tip {
                        margin-top: 14px;
                        padding: 13px 15px;
                        border-radius: 14px;
                        background: rgba(231, 241, 221, .8);
                        line-height: 1.6;
                    }

                    .commodity-reminder {
                        display: flex;
                        gap: 12px;
                        align-items: flex-start;
                        margin-top: 18px;
                        padding: 15px 16px;
                        border-radius: 16px;
                        background: rgba(245, 241, 225, .78);
                        font-size: .9rem;
                    }

                    .commodity-reminder > span {
                        font-size: 1.25rem;
                    }

                    .commodity-reminder p {
                        margin: 0;
                        line-height: 1.65;
                    }

                    @keyframes thCommodityIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes thCommodityDetail {
                        from { opacity: 0; transform: translateY(10px) scale(.99); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }

                    @keyframes thCommodityFloat {
                        0%, 100% { transform: translateY(0) rotate(-1deg); }
                        50% { transform: translateY(-5px) rotate(1deg); }
                    }

                    @media (max-width: 1000px) {
                        .commodity-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                        .commodity-detail { grid-template-columns: 150px 1fr; }
                    }

                    @media (max-width: 760px) {
                        .commodity-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                        .commodity-detail { grid-template-columns: 1fr; }
                        .commodity-detail-visual { min-height: 150px; }
                        .commodity-detail-grid { grid-template-columns: 1fr; }
                    }

                    @media (max-width: 520px) {
                        .commodity-grid { grid-template-columns: 1fr; }
                        .commodity-detail { padding: 17px; }
                        .commodity-detail-heading { flex-direction: column; }
                        .commodity-filters { gap: 7px; }
                        .commodity-filter { padding: 9px 12px; font-size: .88rem; }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .commodity-card,
                        .commodity-detail,
                        .commodity-detail-icon { animation: none !important; }
                        .commodity-filter,
                        .commodity-card { transition: none; }
                    }
                `;
                document.head.appendChild(style);
            }

            const commodities = {
                jeruk: {
                    icon: "🍊", name: "Jeruk", category: "buah", categoryLabel: "Buah",
                    badge: "KULKAS / SEJUK",
                    text: "Jeruk cukup tahan, tetapi kualitasnya tetap lebih terjaga bila dijauhkan dari panas dan kelembapan berlebih.",
                    store: "Simpan di tempat sejuk; kulkas membantu bila ingin memperpanjang masa simpan.",
                    watch: "Kulit mulai lembek, berjamur, atau muncul bagian rusak.",
                    avoid: "Panas langsung dan wadah yang membuat buah terlalu lembap.",
                    tip: "Jangan mencuci seluruh jeruk sebelum disimpan jika belum akan segera dimakan."
                },
                anggur: {
                    icon: "🍇", name: "Anggur", category: "buah", categoryLabel: "Buah",
                    badge: "KULKAS",
                    text: "Anggur lebih cocok disimpan dingin dan tetap kering agar kualitasnya tidak cepat menurun.",
                    store: "Simpan di kulkas dan biarkan tetap kering; cuci mendekati waktu makan.",
                    watch: "Buah pecah, lembap, berjamur, atau mulai terlepas dari tangkai.",
                    avoid: "Mencuci lalu menyimpan dalam keadaan basah terlalu lama.",
                    tip: "Gunakan wadah yang punya sirkulasi udara agar kelembapan tidak terperangkap."
                },
                pisang: {
                    icon: "🍌", name: "Pisang", category: "buah", categoryLabel: "Buah",
                    badge: "SUHU RUANG",
                    text: "Pisang dapat melanjutkan pematangan setelah dipanen. Suhu terlalu rendah dapat mengganggu kualitasnya.",
                    store: "Simpan pada suhu ruang sampai tingkat kematangan yang diinginkan.",
                    watch: "Perubahan warna kulit, aroma, dan tekstur yang makin lunak.",
                    avoid: "Menyimpan pisang yang belum matang di tempat terlalu dingin.",
                    tip: "Setelah matang, pisahkan dari area yang terlalu panas agar tidak cepat lembek."
                },
                mangga: {
                    icon: "🥭", name: "Mangga", category: "buah", categoryLabel: "Buah",
                    badge: "MATANG DULU",
                    text: "Mangga dapat matang setelah dipanen. Penanganan dan suhu penyimpanan perlu disesuaikan dengan tingkat kematangannya.",
                    store: "Biarkan matang pada suhu ruang; setelah matang, kulkas dapat membantu memperpanjang kualitas.",
                    watch: "Tekstur terlalu lunak, memar, atau bagian kulit yang mulai rusak.",
                    avoid: "Benturan dan penyimpanan dingin terlalu awal untuk buah yang masih mentah.",
                    tip: "Pisahkan mangga yang sudah sangat matang dari buah lain bila ingin memperlambat perubahan kualitas."
                },
                melon: {
                    icon: "🍈", name: "Melon", category: "buah", categoryLabel: "Buah",
                    badge: "SEJUK / KULKAS",
                    text: "Melon utuh dapat disimpan di tempat sejuk, sedangkan melon yang sudah dipotong perlu segera didinginkan.",
                    store: "Simpan utuh di tempat sejuk; setelah dipotong, tutup dan simpan di kulkas.",
                    watch: "Bagian potongan, lendir, aroma tidak normal, dan perubahan tekstur.",
                    avoid: "Membiarkan potongan melon terbuka pada suhu ruang terlalu lama.",
                    tip: "Gunakan wadah tertutup untuk potongan melon agar tidak mudah terkontaminasi atau kehilangan air."
                },
                semangka: {
                    icon: "🍉", name: "Semangka", category: "buah", categoryLabel: "Buah",
                    badge: "SEJUK / KULKAS",
                    text: "Semangka utuh tidak harus langsung masuk kulkas. Setelah dipotong, penyimpanan dingin menjadi jauh lebih penting.",
                    store: "Simpan utuh di tempat sejuk; potongan semangka harus ditutup dan disimpan di kulkas.",
                    watch: "Bagian potongan yang mulai berlendir, berbau tidak normal, atau terlalu lunak.",
                    avoid: "Membiarkan buah yang sudah dipotong terlalu lama pada suhu ruang.",
                    tip: "Potong sesuai kebutuhan supaya sisa buah tidak terlalu lama terbuka."
                },
                pepaya: {
                    icon: "🧡", name: "Pepaya", category: "buah", categoryLabel: "Buah",
                    badge: "MATANG DULU",
                    text: "Pepaya terus berubah selama pematangan. Cara simpannya bisa berbeda antara buah yang masih mentah dan yang sudah matang.",
                    store: "Biarkan buah yang belum matang pada suhu ruang; setelah matang, simpan dingin bila perlu.",
                    watch: "Memar, bagian terlalu lunak, dan area yang mulai berjamur.",
                    avoid: "Tekanan kuat dan benturan selama pemindahan.",
                    tip: "Gunakan buah yang paling matang lebih dulu agar tidak ada yang terlanjur rusak."
                },
                kangkung: {
                    icon: "🥬", name: "Kangkung", category: "daun", categoryLabel: "Sayur daun",
                    badge: "KULKAS",
                    text: "Sayuran daun cepat kehilangan air. Tujuannya adalah menjaga kesegaran tanpa membuatnya terus-menerus basah.",
                    store: "Simpan di kulkas dalam kondisi relatif kering dan gunakan wadah atau pembungkus yang sesuai.",
                    watch: "Daun layu, menguning, berlendir, atau mulai membusuk.",
                    avoid: "Kelembapan berlebih yang membuat daun terus basah dan cepat rusak.",
                    tip: "Pilah daun yang rusak sebelum disimpan agar tidak mempercepat kerusakan bagian lain."
                },
                pakis: {
                    icon: "🌿", name: "Pakis", category: "daun", categoryLabel: "Sayur daun",
                    badge: "KULKAS",
                    text: "Pakis sebagai sayuran daun perlu dijaga tetap segar dan tidak terlalu lama dalam kondisi lembap berlebih.",
                    store: "Simpan dingin di kulkas dengan kondisi tidak terlalu basah.",
                    watch: "Daun layu, menguning, berlendir, atau berbau tidak normal.",
                    avoid: "Menyimpan dalam keadaan tergenang air atau terlalu rapat tanpa sirkulasi.",
                    tip: "Keringkan air permukaan berlebih sebelum penyimpanan."
                },
                terong: {
                    icon: "🍆", name: "Terong", category: "buah-sayur", categoryLabel: "Sayur buah",
                    badge: "SEJUK, JANGAN TERLALU DINGIN",
                    text: "Terong termasuk komoditas yang sensitif terhadap suhu terlalu rendah, sehingga penyimpanan perlu tetap sejuk tanpa berlebihan.",
                    store: "Simpan pada kondisi sejuk; bila memakai kulkas, hindari bagian yang sangat dingin dan simpan dalam waktu tidak terlalu lama.",
                    watch: "Kulit kusam, cekungan, jaringan lembek, atau perubahan tekstur.",
                    avoid: "Suhu terlalu rendah dalam waktu lama.",
                    tip: "Jangan menekan terong saat menata karena memar kecil dapat mempercepat penurunan kualitas."
                },
                tomat: {
                    icon: "🍅", name: "Tomat", category: "buah-sayur", categoryLabel: "Sayur buah",
                    badge: "SUHU RUANG",
                    text: "Untuk kualitas rasa dan tekstur, tomat matang umumnya lebih baik tidak disimpan terlalu dingin dalam waktu lama.",
                    store: "Simpan pada suhu ruang di tempat teduh; gunakan kulkas bila perlu untuk kondisi tertentu atau setelah dipotong.",
                    watch: "Kulit keriput, terlalu lunak, pecah, atau mulai berjamur.",
                    avoid: "Suhu sangat dingin dalam waktu lama bila kualitas rasa dan tekstur menjadi prioritas.",
                    tip: "Letakkan tomat dengan lembut agar tidak mudah memar."
                },
                timun: {
                    icon: "🥒", name: "Timun", category: "buah-sayur", categoryLabel: "Sayur buah",
                    badge: "SEJUK",
                    text: "Timun menyukai kondisi sejuk, tetapi suhu yang terlalu rendah juga dapat menurunkan kualitas bila terlalu lama.",
                    store: "Simpan dingin dalam waktu yang wajar dan hindari bagian kulkas yang terlalu dingin.",
                    watch: "Kulit keriput, bagian lembek, dan kehilangan kerenyahan.",
                    avoid: "Suhu terlalu rendah dalam waktu lama.",
                    tip: "Jaga tetap kering dan hindari tekanan dari bahan belanja lain."
                },
                cabai: {
                    icon: "🌶️", name: "Cabai", category: "buah-sayur", categoryLabel: "Sayur buah",
                    badge: "KULKAS",
                    text: "Cabai lebih mudah kehilangan kualitas bila lembap, terluka, atau dibiarkan terlalu lama pada kondisi yang tidak sesuai.",
                    store: "Simpan di kulkas dalam kondisi kering dan tidak terlalu padat.",
                    watch: "Keriput, bercak, lembek, dan jamur.",
                    avoid: "Menyimpan cabai basah atau menekannya terlalu kuat.",
                    tip: "Pilah cabai yang rusak agar tidak mempercepat kerusakan cabai lain."
                },
                bengkoang: {
                    icon: "🥔", name: "Bengkoang", category: "umbi-bumbu", categoryLabel: "Umbi & bumbu",
                    badge: "SEJUK / KERING",
                    text: "Bengkoang utuh relatif tahan, sedangkan bengkoang yang sudah dikupas atau dipotong perlu perlakuan lebih hati-hati.",
                    store: "Simpan utuh di tempat sejuk dan kering; bagian yang sudah dipotong disimpan tertutup di kulkas.",
                    watch: "Bagian lembek, lendir, perubahan warna, atau aroma yang tidak normal.",
                    avoid: "Menyimpan potongan terbuka pada suhu ruang terlalu lama.",
                    tip: "Potong sesuai kebutuhan agar sisa bengkoang tidak cepat kehilangan kualitas."
                },
                bawangMerah: {
                    icon: "🧅", name: "Bawang merah", category: "umbi-bumbu", categoryLabel: "Umbi & bumbu",
                    badge: "SEJUK / KERING",
                    text: "Bawang merah lebih cocok disimpan di tempat yang kering dan punya sirkulasi udara daripada dalam wadah tertutup rapat.",
                    store: "Simpan di tempat sejuk, kering, dan berventilasi baik.",
                    watch: "Tunas, bagian lembek, kulit sangat lembap, atau jamur.",
                    avoid: "Kantong atau wadah tertutup yang memerangkap kelembapan.",
                    tip: "Jangan mencampur bawang yang sudah rusak dengan bawang yang masih baik."
                },
                bawangPutih: {
                    icon: "🧄", name: "Bawang putih", category: "umbi-bumbu", categoryLabel: "Umbi & bumbu",
                    badge: "SEJUK / KERING",
                    text: "Bawang putih perlu kondisi kering dan sirkulasi udara agar tidak cepat lembap atau berjamur.",
                    store: "Simpan di tempat sejuk, kering, dan berventilasi baik.",
                    watch: "Tunas berlebihan, bagian lembek, dan jamur.",
                    avoid: "Kelembapan tinggi dan wadah tertutup rapat.",
                    tip: "Gunakan wadah yang memungkinkan udara bergerak, bukan kantong plastik yang tertutup rapat."
                },
                wortel: {
                    icon: "🥕", name: "Wortel", category: "umbi-bumbu", categoryLabel: "Umbi & bumbu",
                    badge: "KULKAS",
                    text: "Wortel lebih awet bila disimpan dingin dan tidak dibiarkan terlalu banyak kehilangan air.",
                    store: "Simpan di kulkas; bila masih ada daunnya, lepaskan terlebih dahulu agar tidak menarik air dari akar.",
                    watch: "Layu, keriput, bagian lembek, atau jamur.",
                    avoid: "Penyimpanan terlalu lama di tempat panas dan terbuka.",
                    tip: "Jaga wortel tetap kering dari air bebas, tetapi jangan biarkan terlalu cepat dehidrasi."
                },
                jagung: {
                    icon: "🌽", name: "Jagung", category: "lainnya", categoryLabel: "Lainnya",
                    badge: "SEGERA DINGINKAN",
                    text: "Jagung manis dapat kehilangan kualitas dengan cepat setelah dipanen, sehingga pendinginan membantu mempertahankan kesegarannya.",
                    store: "Simpan di kulkas sesegera mungkin dan gunakan dalam waktu yang relatif singkat.",
                    watch: "Kelobot/kulit mengering, biji kehilangan kesegaran, atau muncul jamur.",
                    avoid: "Membiarkan jagung segar terlalu lama pada suhu ruang.",
                    tip: "Semakin cepat jagung didinginkan setelah dibeli atau dipanen, semakin baik untuk menjaga kualitas."
                },
                enoki: {
                    icon: "🍄", name: "Jamur enoki", category: "lainnya", categoryLabel: "Lainnya",
                    badge: "KULKAS",
                    text: "Jamur enoki termasuk bahan segar yang perlu dijaga tetap dingin dan ditangani dengan bersih.",
                    store: "Simpan di kulkas sesuai kemasan dan gunakan relatif segera.",
                    watch: "Lendir, perubahan warna, bau tidak normal, atau tekstur yang sangat lembek.",
                    avoid: "Membiarkan jamur terlalu lama pada suhu ruang atau dalam kondisi lembap berlebih.",
                    tip: "Ikuti petunjuk pada kemasan dan praktik keamanan pangan yang berlaku."
                },
                kacangPanjang: {
                    icon: "🫛", name: "Kacang panjang", category: "lainnya", categoryLabel: "Lainnya",
                    badge: "KULKAS",
                    text: "Kacang panjang lebih terjaga bila disimpan dingin tanpa dibuat terlalu basah.",
                    store: "Simpan di kulkas dalam kondisi relatif kering dan gunakan sebelum terlalu layu.",
                    watch: "Layu, bercak, bagian lembek, atau lendir.",
                    avoid: "Air bebas yang menempel terlalu lama pada permukaan kacang.",
                    tip: "Pilah bagian yang rusak dan jangan menekan kacang terlalu kuat saat menyimpan."
                }
            };

            const renderCommodityCards = category => {
                const entries = Object.entries(commodities)
                    .filter(([, item]) => category === "semua" || item.category === category);

                commodityGrid.innerHTML = entries.map(([key, item], index) => `
                    <button
                        class="commodity-card${key === "jeruk" && category === "semua" ? " active" : ""}"
                        type="button"
                        data-commodity="${key}"
                        style="animation-delay:${Math.min(index * 35, 280)}ms"
                        aria-label="Lihat panduan penyimpanan ${item.name}"
                    >
                        <span class="commodity-card-icon">${item.icon}</span>
                        <span>
                            <strong class="commodity-card-name">${item.name}</strong>
                            <small class="commodity-card-category">${item.categoryLabel}</small>
                        </span>
                    </button>
                `).join("");

                commodityGrid.querySelectorAll(".commodity-card").forEach(card => {
                    card.addEventListener("click", () => {
                        const key = card.dataset.commodity;
                        renderCommodityDetail(key);
                    });
                });
            };

            const renderCommodityDetail = key => {
                const item = commodities[key];
                if (!item) return;

                if (commodityDetailIcon) commodityDetailIcon.textContent = item.icon;
                if (commodityDetailCategory) commodityDetailCategory.textContent = item.categoryLabel.toUpperCase();
                if (commodityDetailTitle) commodityDetailTitle.textContent = item.name;
                if (commodityStorageBadge) commodityStorageBadge.textContent = item.badge;
                if (commodityDetailText) commodityDetailText.textContent = item.text;
                if (commodityStore) commodityStore.textContent = item.store;
                if (commodityWatch) commodityWatch.textContent = item.watch;
                if (commodityAvoid) commodityAvoid.textContent = item.avoid;
                if (commodityTip) commodityTip.textContent = `💡 Tips: ${item.tip}`;

                commodityGrid.querySelectorAll(".commodity-card").forEach(card => {
                    card.classList.toggle("active", card.dataset.commodity === key);
                });

                if (commodityDetail) {
                    commodityDetail.classList.remove("is-refreshing");
                    void commodityDetail.offsetWidth;
                    commodityDetail.classList.add("is-refreshing");
                }
            };

            commodityFilters.forEach(filter => {
                filter.addEventListener("click", () => {
                    const category = filter.dataset.category || "semua";

                    commodityFilters.forEach(item => item.classList.remove("active"));
                    filter.classList.add("active");

                    renderCommodityCards(category);

                    const firstVisible = commodityGrid.querySelector(".commodity-card");
                    if (firstVisible) {
                        renderCommodityDetail(firstVisible.dataset.commodity);
                    }
                });
            });

            renderCommodityCards("semua");
            renderCommodityDetail("jeruk");
        }
    }


    // =====================================================
    // 8. MODUL 3 — MITOS ATAU FAKTA
    // =====================================================

    const mythFactAnswers = {
        "Semua buah lebih awet kalau dimasukkan kulkas.": "mitos",
        "Buah yang terluka lebih mudah mengalami kerusakan.": "fakta",
        "Pisang dan apel dapat menghasilkan etilen.": "fakta"
    };

    const mythFactFeedback = {
        "Semua buah lebih awet kalau dimasukkan kulkas.": {
            correct:
                "Benar! Ini MITOS. Tidak semua komoditas cocok disimpan pada suhu rendah. Beberapa komoditas sensitif terhadap suhu terlalu rendah.",
            wrong:
                "Belum tepat. Jawabannya MITOS. Suhu rendah tidak selalu cocok untuk semua komoditas."
        },

        "Buah yang terluka lebih mudah mengalami kerusakan.": {
            correct:
                "Benar! Ini FAKTA. Kerusakan fisik dapat membuat jaringan lebih rentan terhadap kerusakan dan mikroorganisme.",
            wrong:
                "Belum tepat. Jawabannya FAKTA. Luka pada hasil panen dapat meningkatkan risiko kerusakan."
        },

        "Pisang dan apel dapat menghasilkan etilen.": {
            correct:
                "Benar! Ini FAKTA. Pisang dan apel termasuk contoh komoditas yang menghasilkan etilen.",
            wrong:
                "Belum tepat. Jawabannya FAKTA. Pisang dan apel dapat menghasilkan etilen."
        }
    };

    const mythCards =
        document.querySelectorAll(".myth-card");

    mythCards.forEach(card => {
        const buttons =
            card.querySelectorAll(".myth-button");

        const question =
            card.querySelector(".myth-question");

        const feedback =
            card.querySelector(".myth-feedback");

        if (!question || !feedback) return;

        const questionText =
            question.textContent
                .replace(/[“”"]/g, "")
                .replace(/\s+/g, " ")
                .trim();

        const correctAnswer =
            mythFactAnswers[questionText];

        buttons.forEach(button => {
            button.addEventListener("click", function () {
                const selectedAnswer =
                    this.dataset.answer;

                buttons.forEach(item => {
                    item.classList.remove(
                        "correct",
                        "wrong"
                    );
                });

                if (selectedAnswer === correctAnswer) {
                    this.classList.add("correct");

                    if (
                        mythFactFeedback[questionText]
                    ) {
                        feedback.textContent =
                            mythFactFeedback[
                                questionText
                            ].correct;
                    }
                } else {
                    this.classList.add("wrong");

                    if (
                        mythFactFeedback[questionText]
                    ) {
                        feedback.textContent =
                            mythFactFeedback[
                                questionText
                            ].wrong;
                    }
                }
            });
        });
    });


    // =====================================================
    // 9. SCROLL REVEAL
    // =====================================================

    const revealElements =
        document.querySelectorAll(".scroll-reveal, .reveal");

    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {
        const revealObserver =
            new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // =====================================================
    // 9B. EROSI — SAFETY VISIBILITY
    // =====================================================
    if (document.body.classList.contains("erosion-page")) {
        setTimeout(() => {
            document.querySelectorAll(".erosion-page .scroll-reveal, .erosion-page .reveal")
                .forEach(element => element.classList.add("visible"));
        }, 80);
    }


    // =====================================================
    // 10. NAVBAR ACTIVE STATE
    // =====================================================

    const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";

    document
        .querySelectorAll(".navbar nav a")
        .forEach(link => {
            const linkPage =
                link.getAttribute("href");

            if (
                linkPage &&
                (
                    linkPage === currentPage ||
                    (
                        currentPage === "" &&
                        linkPage === "index.html"
                    )
                )
            ) {
                link.classList.add("active");
            }
        });


    // =====================================================
    // 11. BUTTON PRESS FEEDBACK
    // =====================================================

    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("mousedown", function () {
            this.classList.add("pressed");
        });

        button.addEventListener("mouseup", function () {
            this.classList.remove("pressed");
        });

        button.addEventListener("mouseleave", function () {
            this.classList.remove("pressed");
        });

    });


    // =====================================================
    // 12. DEBUG / STATUS
    // =====================================================

    console.log(
        "🌱 TANAHITA aktif — tanah, erosi, dan pascapanen siap."
    );

    console.log(
        "🪨 Detail erosi:",
        erosionDetailButtons.length,
        "tombol."
    );

    console.log(
        "🧠 Kuis erosi:",
        erosionQuizQuestions.length,
        "soal."
    );

    const commodityCardCount =
        document.querySelectorAll(".commodity-card").length;

    console.log(
        "🍎 Modul Pascapanen:",
        commodityCardCount || document.querySelectorAll(".product-button").length,
        "komoditas/produk tersedia."
    );

    console.log(
        "🧠 Identifikasi masalah:",
        damageButtons.length,
        "pilihan tersedia."
    );

    console.log(
        "🎮 Mitos/Fakta:",
        mythCards.length,
        "pertanyaan tersedia."
    );


    // =====================================================
    // 13. TANAHITA — PUBLIC PAGES + FUN GARDEN
    // =====================================================

    const pageName =
        window.location.pathname.split("/").pop().toLowerCase();

    const isEksplorasi = pageName === "eksplorasi.html";
    const isSurvei = pageName === "survei.html";
    const isTentang = pageName === "tentang.html";

    if (!document.getElementById("tanahita-public-style")) {
        const style = document.createElement("style");
        style.id = "tanahita-public-style";
        style.textContent = `
            .th-public-zone {
                width:min(1100px,calc(100% - 40px));
                margin:58px auto;
                padding:34px;
                border-radius:30px;
                background:linear-gradient(135deg,#fffdf4,#f1f8ef);
                border:1px solid rgba(25,73,48,.11);
                box-shadow:0 18px 55px rgba(27,61,43,.08);
                position:relative;
                overflow:hidden;
            }
            .th-public-zone::before {
                content:"🌿";
                position:absolute;
                right:22px;
                top:10px;
                font-size:75px;
                opacity:.10;
                pointer-events:none;
            }
            .th-public-kicker {
                display:inline-flex;
                padding:7px 12px;
                border-radius:999px;
                background:#e5f3e7;
                color:#245c3d;
                font-size:12px;
                font-weight:900;
                letter-spacing:.10em;
            }
            .th-public-zone h2 {
                margin:12px 0 8px;
                color:#173f2b;
                font-size:clamp(28px,4vw,44px);
                line-height:1.05;
            }
            .th-public-zone > p {
                max-width:760px;
                color:#587064;
                line-height:1.7;
            }
            .th-public-grid {
                display:grid;
                grid-template-columns:repeat(3,minmax(0,1fr));
                gap:16px;
                margin-top:25px;
                position:relative;
                z-index:1;
            }
            .th-public-card {
                padding:22px;
                border-radius:22px;
                background:#fff;
                border:1px solid rgba(25,73,48,.09);
                box-shadow:0 10px 28px rgba(22,62,43,.06);
            }
            .th-public-card .emoji {
                width:52px;height:52px;display:grid;place-items:center;
                border-radius:16px;background:#fff2c9;font-size:28px;
                margin-bottom:13px;
            }
            .th-public-card h3 { margin:0;color:#173f2b;font-size:18px; }
            .th-public-card p { margin:7px 0 0;color:#687a70;font-size:14px;line-height:1.6; }

            /* ---------------- GARDEN GAME ---------------- */
            .th-garden {
                background:
                    radial-gradient(circle at 90% 15%,rgba(248,218,117,.45) 0 60px,transparent 61px),
                    linear-gradient(180deg,#f9f6dc 0 34%,#dff1dc 34% 100%);
            }
            .th-garden-top {
                display:flex;
                justify-content:space-between;
                gap:20px;
                align-items:flex-start;
                position:relative;
                z-index:1;
            }
            .th-garden-stats {
                display:grid;
                grid-template-columns:repeat(3,minmax(82px,1fr));
                gap:8px;
                min-width:290px;
            }
            .th-garden-stat {
                padding:11px 9px;
                border-radius:16px;
                background:rgba(255,255,255,.85);
                text-align:center;
                box-shadow:0 7px 18px rgba(22,62,43,.07);
            }
            .th-garden-stat b { display:block;font-size:19px;color:#173f2b; }
            .th-garden-stat span { font-size:11px;color:#6b7d72; }

            .th-garden-bed {
                margin-top:25px;
                min-height:300px;
                border-radius:28px;
                padding:26px;
                position:relative;
                overflow:hidden;
                background:
                    radial-gradient(circle at 15% 20%,rgba(255,255,255,.7) 0 5px,transparent 6px),
                    radial-gradient(circle at 72% 32%,rgba(255,255,255,.55) 0 4px,transparent 5px),
                    linear-gradient(180deg,#bfe3a9 0 52%,#9a633f 52% 100%);
                box-shadow:inset 0 -15px 0 rgba(85,52,35,.12),0 12px 35px rgba(22,62,43,.10);
            }
            .th-garden-cloud {
                position:absolute;
                right:10%;top:24px;font-size:42px;opacity:.75;
            }
            .th-garden-plant {
                position:absolute;
                left:50%;
                bottom:62px;
                transform:translateX(-50%);
                text-align:center;
                transition:transform .35s ease;
                user-select:none;
            }
            .th-garden-plant:hover { transform:translateX(-50%) scale(1.04); }
            .th-plant-emoji {
                font-size:clamp(65px,10vw,105px);
                filter:drop-shadow(0 8px 5px rgba(41,70,34,.16));
                display:block;
                line-height:1;
            }
            .th-garden-name {
                display:inline-block;
                margin-top:8px;
                padding:7px 12px;
                border-radius:999px;
                background:rgba(255,255,255,.90);
                color:#173f2b;
                font-weight:900;
                font-size:13px;
            }
            .th-garden-soil {
                position:absolute;
                left:0;right:0;bottom:0;height:62px;
                background:rgba(74,45,32,.16);
            }
            .th-garden-controls {
                display:flex;flex-wrap:wrap;gap:10px;
                margin-top:18px;
                position:relative;z-index:2;
            }
            .th-garden-btn {
                border:0;border-radius:15px;padding:12px 15px;
                background:#fff;color:#245c3d;font-weight:900;cursor:pointer;
                box-shadow:0 7px 18px rgba(22,62,43,.09);
                transition:transform .18s ease,background .18s ease;
            }
            .th-garden-btn:hover { transform:translateY(-3px);background:#f2f8e9; }
            .th-garden-btn.primary { background:#173f2b;color:#fff; }
            .th-garden-btn:disabled { opacity:.45;cursor:not-allowed;transform:none; }
            .th-garden-message {
                margin-top:15px;padding:15px 17px;border-radius:17px;
                background:rgba(255,255,255,.82);color:#50665a;
                font-size:14px;line-height:1.55;min-height:22px;
            }
            .th-garden-progress {
                height:12px;border-radius:999px;background:rgba(255,255,255,.65);
                overflow:hidden;margin-top:12px;
            }
            .th-garden-progress span {
                display:block;height:100%;width:0;
                background:linear-gradient(90deg,#5f9e61,#e5c65c);
                border-radius:inherit;transition:width .5s ease;
            }
            .th-garden-help {
                display:grid;grid-template-columns:repeat(3,1fr);
                gap:10px;margin-top:18px;
            }
            .th-garden-help div {
                padding:13px;border-radius:17px;background:rgba(255,255,255,.72);
                color:#61746a;font-size:12px;line-height:1.5;
            }
            .th-garden-help strong { display:block;color:#173f2b;margin-bottom:3px; }

            /* ---------------- SURVEY DONUTS ---------------- */
            .th-donut-grid {
                display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
                gap:17px;margin-top:25px;
            }
            .th-donut-card {
                padding:20px;border-radius:24px;background:#fff;text-align:center;
                border:1px solid rgba(25,73,48,.09);
                box-shadow:0 10px 28px rgba(22,62,43,.06);
            }
            .th-donut {
                width:145px;height:145px;margin:0 auto 15px;border-radius:50%;
                display:grid;place-items:center;position:relative;
            }
            .th-donut::after {
                content:"";position:absolute;width:92px;height:92px;border-radius:50%;background:#fff;
            }
            .th-donut b { position:relative;z-index:1;font-size:23px;color:#173f2b; }
            .th-donut-card h3 { margin:0;color:#173f2b;font-size:16px; }
            .th-donut-card p { margin:7px 0 0;color:#6a7c71;font-size:13px;line-height:1.55; }

            .th-about-callout {
                margin-top:23px;padding:24px;border-radius:24px;
                background:linear-gradient(110deg,#e9f5e9,#fff3bf);
                color:#173f2b;font-size:21px;font-weight:850;line-height:1.45;
            }
            .th-about-callout small { display:block;margin-top:8px;color:#63766b;font-size:13px;font-weight:500;line-height:1.6; }

            .th-info-list { display:grid;gap:10px;margin-top:22px; }
            .th-info-item { display:grid;grid-template-columns:42px 1fr;gap:12px;padding:14px;border-radius:17px;background:#f7faf4; }
            .th-info-item .emoji { font-size:25px;text-align:center; }
            .th-info-item strong { color:#173f2b; }
            .th-info-item p { margin:4px 0 0;color:#687a70;font-size:13px;line-height:1.55; }

            @media(max-width:820px){
                .th-public-grid,.th-donut-grid{grid-template-columns:1fr 1fr}
                .th-garden-top{flex-direction:column}
                .th-garden-stats{width:100%}
                .th-garden-help{grid-template-columns:1fr}
            }
            @media(max-width:560px){
                .th-public-zone{width:calc(100% - 24px);padding:22px;margin:42px auto}
                .th-public-grid,.th-donut-grid{grid-template-columns:1fr}
                .th-garden-stats{min-width:0}
            }
        `;
        document.head.appendChild(style);
    }

    function thInsertBeforeFooter(section) {
        const footer = document.querySelector("footer");
        if (footer && footer.parentNode) {
            footer.parentNode.insertBefore(section, footer);
        } else {
            document.querySelector("main")?.appendChild(section);
        }
    }

    function thMakeZone(kicker, title, description, extraClass="") {
        const section = document.createElement("section");
        section.className = `th-public-zone ${extraClass}`;
        section.innerHTML = `
            <div class="th-public-kicker">✦ ${kicker}</div>
            <h2>${title}</h2>
            <p>${description}</p>
        `;
        return section;
    }


        /* =====================================================
           EKSPLORASI WOW LAYER — TAMBAHAN SAJA
           ===================================================== */
        if (isEksplorasi) {
            document.body.classList.add("th-explore-combined");
            const navbar = document.querySelector(".navbar");
            if (navbar && !document.getElementById("thNavbarExploreHero")) {
                const hero = document.createElement("div");
                hero.className = "th-navbar-explore-hero";
                hero.id = "thNavbarExploreHero";
                hero.innerHTML = `
                    <div class="th-navbar-kicker">🌾 JELAJAHI TANAHITA</div>
                    <h1>Satu perjalanan kecil untuk memahami <span>tanah, tanaman, dan hasilnya.</span></h1>
                    <p>Kenali hal-hal sederhana di sekitar kita dan lihat bagaimana tanah, air, tanaman, sampai hasil panen saling terhubung.</p>
                `;
                navbar.appendChild(hero);
            }
        }

        if (isEksplorasi && !document.getElementById("thEksplorasiWowStyle")) {
            const wowStyle = document.createElement("style");
            wowStyle.id = "thEksplorasiWowStyle";
            wowStyle.textContent = `
                /* Eksplorasi: NAVBAR + JELAJAHI TANAHITA = SATU OPENING */
                body.th-explore-combined .navbar {
                    background:linear-gradient(135deg,#315744 0%,#426b52 58%,#5f8069 100%) !important;
                    border-bottom:0 !important;
                    box-shadow:none !important;
                    color:#fff !important;
                    position:relative;
                    min-height:420px;
                    padding-bottom:56px !important;
                    overflow:hidden;
                }
                body.th-explore-combined .navbar::before {
                    content:"";
                    position:absolute;
                    width:300px;height:300px;
                    right:-85px;top:-120px;
                    border-radius:50%;
                    background:rgba(246,221,139,.25);
                }
                body.th-explore-combined .navbar::after {
                    content:"";
                    position:absolute;
                    width:260px;height:260px;
                    left:-110px;bottom:-170px;
                    border-radius:50%;
                    background:rgba(177,207,174,.16);
                }
                body.th-explore-combined .navbar .logo,
                body.th-explore-combined .navbar nav a {
                    color:#f8f5ec !important;
                }
                /* Navigasi tetap di pojok kanan atas, hero menyatu di bawahnya. */
                body.th-explore-combined .navbar .container {
                    position:relative;
                }
                body.th-explore-combined .navbar nav {
                    position:absolute !important;
                    top:0;
                    right:clamp(28px, 4.5vw, 78px);
                    margin:0 !important;
                    z-index:5;
                }
                body.th-explore-combined .navbar .th-navbar-explore-hero {
                    margin-top:72px;
                }
                body.th-explore-combined .navbar nav a.active {
                    color:#f5d978 !important;
                }
                body.th-explore-combined .navbar .container,
                body.th-explore-combined .navbar > * {
                    position:relative;
                    z-index:2;
                }
                body.th-explore-combined .navbar .th-navbar-explore-hero {
                    width:min(1100px,calc(100% - 40px));
                    margin:54px auto 0;
                    position:relative;
                    z-index:2;
                }
                .th-navbar-explore-hero .th-navbar-kicker {
                    display:inline-flex;
                    padding:8px 13px;
                    border-radius:999px;
                    background:rgba(255,255,255,.13);
                    border:1px solid rgba(255,255,255,.20);
                    color:#fff;
                    font-size:11px;
                    font-weight:900;
                    letter-spacing:.13em;
                }
                .th-navbar-explore-hero h1 {
                    max-width:850px;
                    margin:16px 0 9px;
                    color:#fff;
                    font-size:clamp(36px,5.2vw,64px);
                    line-height:1.03;
                    letter-spacing:-.04em;
                }
                .th-navbar-explore-hero h1 span { color:#f4d978; }
                .th-navbar-explore-hero p {
                    max-width:730px;
                    margin:0;
                    color:rgba(255,255,255,.80);
                    font-size:15px;
                    line-height:1.75;
                }
                body.th-explore-combined main > section:first-child {
                    display:none !important;
                }
                body.th-explore-combined .th-explore-wow {
                    margin-top:46px;
                }
                @media(max-width:700px){
                    body.th-explore-combined .navbar { min-height:500px; padding-bottom:42px !important; }
                    body.th-explore-combined .navbar .container { min-height:48px; }
                    body.th-explore-combined .navbar nav {
                        position:static !important;
                        margin-left:auto !important;
                        margin-top:10px !important;
                    }
                    body.th-explore-combined .navbar .th-navbar-explore-hero { width:calc(100% - 24px); margin-top:42px; }
                    .th-navbar-explore-hero h1 { font-size:clamp(34px,10vw,48px); }
                }

                .th-explore-wow {
                    width:min(1100px,calc(100% - 40px));
                    margin:0 auto 28px;
                    padding:clamp(28px,4vw,42px);
                    border-radius:32px;
                    position:relative;
                    overflow:hidden;
                    background:linear-gradient(135deg,#f5f7e9 0%,#eef5e9 55%,#e8f1e8 100%);
                    border:1px solid rgba(48,88,63,.10);
                    box-shadow:0 18px 55px rgba(35,68,48,.08);
                    color:#244a34;
                }
                .th-explore-wow::before {
                    content:"";
                    position:absolute;
                    width:220px;height:220px;
                    right:-70px;top:-85px;
                    border-radius:50%;
                    background:rgba(237,211,116,.28);
                }
                .th-explore-wow::after {
                    content:"";
                    position:absolute;
                    width:180px;height:180px;
                    left:-80px;bottom:-100px;
                    border-radius:50%;
                    background:rgba(135,181,145,.18);
                }
                .th-explore-wow-inner { position:relative;z-index:1; }
                .th-explore-wow-kicker {
                    display:inline-flex;
                    padding:7px 12px;
                    border-radius:999px;
                    background:#e1efe2;
                    color:#356046;
                    font-size:11px;
                    font-weight:900;
                    letter-spacing:.13em;
                }
                .th-explore-wow h2 {
                    margin:15px 0 8px;
                    max-width:760px;
                    color:#234c35;
                    font-size:clamp(25px,3.5vw,40px);
                    line-height:1.08;
                    letter-spacing:-.025em;
                }
                .th-explore-wow-intro {
                    max-width:760px;
                    margin:0;
                    color:#66786c;
                    line-height:1.7;
                    font-size:14px;
                }
                .th-explore-wow-map {
                    display:grid;
                    grid-template-columns:repeat(4,minmax(0,1fr));
                    gap:12px;
                    margin-top:28px;
                    position:relative;
                }
                .th-explore-wow-map::before {
                    content:"";
                    position:absolute;
                    left:8%;right:8%;top:38px;
                    border-top:2px dashed rgba(67,119,81,.22);
                    z-index:0;
                }
                .th-explore-wow-card {
                    position:relative;
                    z-index:1;
                    padding:18px;
                    min-height:160px;
                    border-radius:22px;
                    background:rgba(255,255,255,.72);
                    border:1px solid rgba(48,88,63,.10);
                    box-shadow:0 8px 24px rgba(39,72,51,.05);
                    transition:transform .2s ease,box-shadow .2s ease;
                }
                .th-explore-wow-card:hover {
                    transform:translateY(-4px);
                    box-shadow:0 14px 30px rgba(39,72,51,.10);
                }
                .th-explore-wow-icon {
                    width:46px;height:46px;
                    display:grid;place-items:center;
                    border-radius:15px;
                    background:#edf5e9;
                    font-size:24px;
                    margin-bottom:13px;
                }
                .th-explore-wow-card small {
                    display:block;
                    margin-bottom:4px;
                    color:#78907e;
                    font-size:10px;
                    font-weight:900;
                    letter-spacing:.12em;
                }
                .th-explore-wow-card h3 { margin:0;color:#234c35;font-size:16px; }
                .th-explore-wow-card p { margin:7px 0 0;color:#718076;font-size:12px;line-height:1.55; }
                .th-explore-wow-foot {
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    gap:16px;
                    margin-top:22px;
                    padding-top:18px;
                    border-top:1px solid rgba(48,88,63,.10);
                }
                .th-explore-wow-foot strong { color:#315c41;font-size:13px; }
                .th-explore-wow-foot span { color:#78877d;font-size:12px; }
                .th-garden-note {
                    width:min(1100px,calc(100% - 40px));
                    margin:0 auto 48px;
                    padding:20px 23px;
                    border-radius:24px;
                    display:flex;
                    align-items:center;
                    gap:16px;
                    background:linear-gradient(100deg,#fff2bd,#e9f5e8);
                    border:1px solid rgba(25,73,48,.10);
                    box-shadow:0 12px 32px rgba(22,62,43,.07);
                }
                .th-garden-note-icon {
                    width:55px;height:55px;flex:0 0 55px;
                    display:grid;place-items:center;
                    border-radius:18px;
                    background:#fff;
                    font-size:29px;
                }
                .th-garden-note strong {
                    display:block;
                    color:#173f2b;
                    font-size:16px;
                    margin-bottom:4px;
                }
                .th-garden-note span {
                    display:block;
                    color:#64766b;
                    font-size:13px;
                    line-height:1.55;
                }
                .th-garden-note-arrow {
                    margin-left:auto;
                    font-size:24px;
                    color:#4d805a;
                }
                @media(max-width:760px){
                    .th-explore-wow-cards{grid-template-columns:1fr}
                    .th-garden-note{align-items:flex-start}
                    .th-garden-note-arrow{display:none}
                }
                @media(max-width:560px){
                    .th-explore-wow,.th-garden-note{width:calc(100% - 24px)}
                    .th-explore-wow-inner{padding:26px 21px}
                }
            `;
            document.head.appendChild(wowStyle);
        }

        // Add the richer exploration layer without deleting/replacing anything already on the page.
        if (isEksplorasi && !document.getElementById("thEksplorasiWow")) {
            const wow = document.createElement("section");
            wow.className = "th-explore-wow";
            wow.id = "thEksplorasiWow";
            wow.innerHTML = `
                <div class="th-explore-wow-inner">
                    <div class="th-explore-wow-kicker">🌿 PETA KECIL TANAHITA</div>
                    <h2>Kalau pertanian adalah perjalanan, <em>kamu mulai dari mana?</em></h2>
                    <p class="th-explore-wow-intro">
                        Jelajahi hubungan sederhana yang sering luput kita lihat: tanah memengaruhi air,
                        air memengaruhi tanaman, dan cara kita merawat tanaman ikut menentukan hasil akhirnya.
                    </p>

                    <div class="th-explore-wow-map">
                        <article class="th-explore-wow-card">
                            <div class="th-explore-wow-icon">🪨</div>
                            <small>01 · DI BAWAH KAKIMU</small>
                            <h3>Tanah</h3>
                            <p>Tekstur dan kondisi tanah menjadi tempat awal tanaman tumbuh.</p>
                        </article>
                        <article class="th-explore-wow-card">
                            <div class="th-explore-wow-icon">💧</div>
                            <small>02 · YANG MENGALIR</small>
                            <h3>Air</h3>
                            <p>Air dibutuhkan tanaman, tetapi alirannya juga dapat membawa tanah.</p>
                        </article>
                        <article class="th-explore-wow-card">
                            <div class="th-explore-wow-icon">🌱</div>
                            <small>03 · YANG TUMBUH</small>
                            <h3>Tanaman</h3>
                            <p>Tanaman membutuhkan kondisi yang sesuai agar bisa tumbuh sehat.</p>
                        </article>
                        <article class="th-explore-wow-card">
                            <div class="th-explore-wow-icon">🍅</div>
                            <small>04 · YANG KITA JAGA</small>
                            <h3>Hasil</h3>
                            <p>Panen tetap perlu dirawat agar kualitasnya tidak cepat menurun.</p>
                        </article>
                    </div>

                    <div class="th-explore-wow-foot">
                        <strong>👀 Coba lihat satu per satu saat kamu menjelajah.</strong>
                        <span>Setiap bagian punya ceritanya sendiri →</span>
                    </div>
                </div>
            `;

            const main = document.querySelector("main");
            if (main) {
                const firstSection = main.querySelector("section");
                if (firstSection) {
                    firstSection.insertAdjacentElement("afterend", wow);
                } else {
                    main.prepend(wow);
                }
            }

            // Noted ini sengaja berada tepat di bawah PETA KECIL TANAHITA,
            // sebelum bagian PILIH TOPIK dan materi eksplorasi.
            if (!document.getElementById("thExploreGardenNote")) {
                const gardenNote = document.createElement("div");
                gardenNote.className = "th-garden-note";
                gardenNote.id = "thExploreGardenNote";
                gardenNote.innerHTML = `
                    <div class="th-garden-note-icon">🌱</div>
                    <div>
                        <strong>🌟 Psst... di paling bawah ada kejutan!</strong>
                        <span>Setelah menjelajah semua topik, scroll sampai paling bawah untuk menumbuhkan tanaman online milikmu sendiri. Siram setiap hari, jaga 🔥 streak, dan lihat tanamanmu tumbuh sedikit demi sedikit. 🪴</span>
                    </div>
                    <div class="th-garden-note-arrow">↓</div>
                `;
                wow.insertAdjacentElement("afterend", gardenNote);
            }
        }

    // -----------------------------------------------------
    // EKSPLORASI — MINI GARDEN, BUKAN LINK MODUL
    // -----------------------------------------------------
    if (isEksplorasi && !document.getElementById("thGardenGame")) {
        const garden = thMakeZone(
            "TANAHITA GARDEN",
            "🪴 Taman kecilmu sendiri",
            "Rawat satu tanaman setiap hari. Siram, kumpulkan streak, dan lihat tanamanmu tumbuh sedikit demi sedikit. Mirip konsep streak, tapi versi kebun 🌱",
            "th-garden"
        );
        garden.id = "thGardenGame";

        garden.innerHTML += `
            <div class="th-garden-top">
                <div>
                    <div class="th-public-kicker">🌱 TANAMAN PERTAMAMU</div>
                    <p style="margin:10px 0 0;max-width:560px;">
                        Setiap hari kamu bisa melakukan perawatan. Streak tersimpan di browser ini,
                        jadi tamanmu bisa terus berkembang saat kamu kembali lagi.
                    </p>
                </div>
                <div class="th-garden-stats">
                    <div class="th-garden-stat"><b id="thGardenStreak">0 🔥</b><span>streak</span></div>
                    <div class="th-garden-stat"><b id="thGardenWater">0 💧</b><span>siraman</span></div>
                    <div class="th-garden-stat"><b id="thGardenDay">1</b><span>hari tanaman</span></div>
                </div>
            </div>

            <div class="th-garden-bed">
                <div class="th-garden-cloud">☁️</div>
                <div class="th-garden-soil"></div>
                <div class="th-garden-plant" id="thGardenPlant">
                    <span class="th-plant-emoji" id="thGardenPlantEmoji">🌱</span>
                    <span class="th-garden-name" id="thGardenPlantName">Bibit kecilmu</span>
                </div>
            </div>

            <div class="th-garden-progress">
                <span id="thGardenProgress"></span>
            </div>

            <div class="th-garden-controls">
                <button type="button" class="th-garden-btn primary" id="thGardenWaterBtn">💧 Siram tanaman</button>
                <button type="button" class="th-garden-btn" id="thGardenNameBtn">🏷️ Ganti nama tanaman</button>
                <button type="button" class="th-garden-btn" id="thGardenResetBtn">🌱 Mulai dari bibit lagi</button>
            </div>

            <div class="th-garden-message" id="thGardenMessage">
                🌱 Bibitmu menunggu perhatian. Yuk mulai dengan menyiram hari ini!
            </div>

            <div class="th-garden-help">
                <div><strong>🔥 Streak</strong>Rawat tanaman secara rutin untuk menjaga streak.</div>
                <div><strong>🌿 Tumbuh</strong>Semakin banyak hari dirawat, emoji tanaman berubah.</div>
                <div><strong>💾 Tersimpan</strong>Progres disimpan di browser dengan localStorage.</div>
            </div>
        `;

        thInsertBeforeFooter(garden);

        const KEY = "tanahita_garden_v1";
        const todayKey = () => new Date().toLocaleDateString("en-CA");

        const stages = [
            { day:0, emoji:"🌱", name:"Bibit kecilmu" },
            { day:2, emoji:"🌿", name:"Mulai tumbuh" },
            { day:5, emoji:"🪴", name:"Tanaman muda" },
            { day:9, emoji:"🌳", name:"Tanaman kuat" },
            { day:15, emoji:"🌳✨", name:"Pohon kecilmu" }
        ];

        let state = {
            streak:0,
            water:0,
            day:1,
            lastWater:"",
            plantName:"Bibit kecilmu"
        };

        try {
            const saved = JSON.parse(localStorage.getItem(KEY) || "null");
            if (saved) state = {...state, ...saved};
        } catch(e) {}

        const streakEl = document.getElementById("thGardenStreak");
        const waterEl = document.getElementById("thGardenWater");
        const dayEl = document.getElementById("thGardenDay");
        const plantEmojiEl = document.getElementById("thGardenPlantEmoji");
        const plantNameEl = document.getElementById("thGardenPlantName");
        const progressEl = document.getElementById("thGardenProgress");
        const messageEl = document.getElementById("thGardenMessage");
        const waterBtn = document.getElementById("thGardenWaterBtn");

        function saveGarden() {
            try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e) {}
        }

        function stageForDay(day) {
            let chosen = stages[0];
            stages.forEach(stage => { if (day >= stage.day) chosen = stage; });
            return chosen;
        }

        function renderGarden() {
            const stage = stageForDay(state.streak);
            const progress = Math.min(100, Math.round((state.streak / 15) * 100));

            streakEl.textContent = `${state.streak} 🔥`;
            waterEl.textContent = `${state.water} 💧`;
            dayEl.textContent = `${Math.max(1,state.day)}`;
            plantEmojiEl.textContent = stage.emoji;
            plantNameEl.textContent = state.plantName || stage.name;
            progressEl.style.width = `${progress}%`;

            const wateredToday = state.lastWater === todayKey();
            waterBtn.disabled = wateredToday;

            if (wateredToday) {
                messageEl.innerHTML = "💚 Sudah disiram hari ini! Istirahat dulu. Besok balik lagi supaya streak-mu lanjut.";
            } else if (state.streak >= 15) {
                messageEl.innerHTML = "🌳✨ Wah! Tanamanmu sudah jadi pohon kecil. Jangan lupa tetap dirawat!";
            } else {
                messageEl.innerHTML = `🌱 Tanamanmu ada di hari ke-${Math.max(1,state.day)}. Siram hari ini untuk menjaga streak!`;
            }
        }

        waterBtn.addEventListener("click", () => {
            const today = todayKey();
            if (state.lastWater === today) return;

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayKey = yesterday.toLocaleDateString("en-CA");

            if (!state.lastWater) {
                state.streak = 1;
            } else if (state.lastWater === yesterdayKey) {
                state.streak += 1;
            } else {
                state.streak = 1;
            }

            state.water += 1;
            state.day = Math.max(1, state.streak);
            state.lastWater = today;

            saveGarden();
            renderGarden();
            messageEl.innerHTML = "💧✨ Disiram! Tanamanmu senang. Sampai besok, jangan lupa mampir lagi!";
        });

        document.getElementById("thGardenNameBtn").addEventListener("click", () => {
            const name = prompt("Kasih nama untuk tanamanmu 🌱", state.plantName || "Bibit kecilku");
            if (name && name.trim()) {
                state.plantName = name.trim().slice(0,24);
                saveGarden();
                renderGarden();
                messageEl.innerHTML = `🏷️ Namanya sekarang <strong>${state.plantName}</strong>!`;
            }
        });

        document.getElementById("thGardenResetBtn").addEventListener("click", () => {
            const ok = confirm("Mulai lagi dari bibit? Streak dan siraman akan di-reset.");
            if (!ok) return;
            state = {streak:0,water:0,day:1,lastWater:"",plantName:"Bibit kecilmu"};
            saveGarden();
            renderGarden();
        });

        renderGarden();
    }

    // -----------------------------------------------------
    // SURVEI — DIAGRAM BULAT
    // -----------------------------------------------------
    if (isSurvei && !document.getElementById("thSurveyVisual") && !document.querySelector(".survey-page")) {
        const survey = thMakeZone(
            "HASIL KUESIONER",
            "📊 Data yang bisa dilihat sekilas",
            "Angka hasil survei dibuat menjadi diagram bulat supaya lebih cepat dibaca dan tidak terasa seperti tabel laporan.",
            ""
        );
        survey.id = "thSurveyVisual";

        survey.innerHTML += `
            <div class="th-donut-grid">
                <article class="th-donut-card">
                    <div class="th-donut" style="background:conic-gradient(#4d8c60 0 88.46%,#e3ebe0 88.46% 100%);"><b>88,46%</b></div>
                    <h3>👀 Pernah melihat tanah terkikis</h3>
                    <p>Responden yang pernah melihat tanah terkikis setelah hujan atau terkena aliran air.</p>
                </article>
                <article class="th-donut-card">
                    <div class="th-donut" style="background:conic-gradient(#e0b94f 0 46.15%,#e3ebe0 46.15% 100%);"><b>46,15%</b></div>
                    <h3>🧠 Memahami istilah erosi</h3>
                    <p>Menunjukkan bahwa pemahaman istilah erosi belum dimiliki oleh semua responden.</p>
                </article>
                <article class="th-donut-card">
                    <div class="th-donut" style="background:conic-gradient(#6d9c80 0 42.31%,#e3ebe0 42.31% 100%);"><b>42,31%</b></div>
                    <h3>❓ Belum mengetahui jenis erosi</h3>
                    <p>Menjadi alasan penting untuk menjelaskan jenis erosi dengan contoh yang mudah dikenali.</p>
                </article>
            </div>

            <div class="th-public-grid">
                <article class="th-public-card"><div class="emoji">💡</div><h3>Apa artinya?</h3><p>Banyak responden sudah pernah melihat gejalanya, tetapi istilah dan jenis erosi tetap perlu dijelaskan dengan bahasa sederhana.</p></article>
                <article class="th-public-card"><div class="emoji">🌱</div><h3>Kenapa penting?</h3><p>Data membantu memberi konteks bahwa edukasi tanah dan erosi memang dekat dengan pengalaman sehari-hari.</p></article>
                <article class="th-public-card"><div class="emoji">📚</div><h3>Kenapa dibuat interaktif?</h3><p>Karena diagram, contoh, dan interaksi bisa membuat data lebih mudah dipahami daripada angka yang berdiri sendiri.</p></article>
            </div>
        `;

        thInsertBeforeFooter(survey);
    }

    // -----------------------------------------------------
    // TENTANG — FOKUS MASYARAKAT UMUM & PERAWAT TANAMAN
    // -----------------------------------------------------
    if (isTentang && !document.getElementById("thAboutVisual")) {
        const about = thMakeZone(
            "TENTANG TANAHITA",
            "🌱 Belajar pertanian tanpa harus jadi ahli dulu",
            "TANAHITA ditujukan untuk masyarakat umum, orang yang baru mulai berkebun, serta siapa pun yang punya atau merawat tanaman. Istilah pertanian dibuat lebih dekat dengan hal-hal yang bisa dilihat dan dilakukan sehari-hari.",
            ""
        );
        about.id = "thAboutVisual";

        about.innerHTML += `
            <div class="th-about-callout">
                “Kamu nggak harus menjadi ahli pertanian untuk mulai memahami tanah dan tanaman.”
                <small>Mulai dari pertanyaan sederhana: kenapa tanah cepat kering? Kenapa air menggenang? Kenapa tanaman layu? Kenapa buah cepat busuk?</small>
            </div>

            <div class="th-public-grid">
                <article class="th-public-card"><div class="emoji">🏠</div><h3>Untuk masyarakat umum</h3><p>Kalau kamu awam tentang pertanian, TANAHITA membantu mengenal istilah dan fenomena pertanian tanpa bahasa yang terlalu teknis.</p></article>
                <article class="th-public-card"><div class="emoji">🪴</div><h3>Untuk yang merawat tanaman</h3><p>Hubungkan materi dengan pengalaman sehari-hari saat menyiram, menanam, melihat tanah, dan mengamati perubahan tanaman.</p></article>
                <article class="th-public-card"><div class="emoji">🌾</div><h3>Untuk pemula pertanian</h3><p>Gunakan modul sebagai titik awal sebelum masuk ke pembahasan pertanian yang lebih mendalam.</p></article>
            </div>

            <div class="th-info-list">
                <div class="th-info-item"><div class="emoji">🪨</div><div><strong>Kenali tanahmu</strong><p>Mulai dari ciri tanah yang bisa disentuh dan diamati, lalu hubungkan dengan air dan tanaman.</p></div></div>
                <div class="th-info-item"><div class="emoji">🌧️</div><div><strong>Lindungi tanahmu</strong><p>Kenali erosi lewat bentuk dan contoh yang lebih mudah dibayangkan.</p></div></div>
                <div class="th-info-item"><div class="emoji">🍅</div><div><strong>Jaga hasil panenmu</strong><p>Pahami mengapa hasil panen bisa cepat layu, busuk, kering, matang, atau lunak.</p></div></div>
                <div class="th-info-item"><div class="emoji">🪴</div><div><strong>Rawat tanaman sedikit demi sedikit</strong><p>Kamu tidak perlu menguasai semuanya sekaligus. Mulai dari satu hal yang ingin kamu pahami hari ini.</p></div></div>
            </div>

            <div class="th-public-grid">
                <article class="th-public-card"><div class="emoji">💧</div><h3>Amati air</h3><p>Lihat apakah tanah cepat kering, menahan air, atau justru menggenang.</p></article>
                <article class="th-public-card"><div class="emoji">☀️</div><h3>Amati cahaya</h3><p>Perhatikan kondisi tempat tanaman tumbuh dan perubahan yang terjadi.</p></article>
                <article class="th-public-card"><div class="emoji">🍃</div><h3>Amati daun</h3><p>Warna dan kondisi daun bisa menjadi hal pertama yang membuat kita bertanya dan belajar.</p></article>
            </div>
        `;

        thInsertBeforeFooter(about);
    }

    // =====================================================
    // 14. MODUL 1 — SECTION 12 INTERACTIVE SOIL CHECKER
    // =====================================================
    if (document.querySelector(".soil-summary")) {

        if (!document.getElementById("tanahita-soil-checker-style")) {
            const style = document.createElement("style");
            style.id = "tanahita-soil-checker-style";
            style.textContent = `
                .soil-summary.soil-checker-summary {
                    overflow: hidden;
                }

                .soil-checker {
                    width: 100%;
                    margin-top: 38px;
                    display: grid;
                    grid-template-columns: 1.05fr .95fr;
                    border-radius: 30px;
                    overflow: hidden;
                    background: #fff;
                    box-shadow: 0 24px 65px rgba(41,75,54,.10);
                    border: 1px solid rgba(41,75,54,.08);
                }

                .soil-checker-stage {
                    position: relative;
                    min-height: 570px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background:
                        radial-gradient(circle at 50% 40%, #fbfdf8 0%, #e8f0e3 48%, #d5e2cf 100%);
                }

                .soil-checker-stage::before,
                .soil-checker-stage::after {
                    content: "";
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                }

                .soil-checker-stage::before {
                    width: 390px;
                    height: 390px;
                    border: 1px solid rgba(41,75,54,.13);
                    animation: thSoilOrbit 18s linear infinite;
                }

                .soil-checker-stage::after {
                    width: 270px;
                    height: 270px;
                    border: 1px dashed rgba(41,75,54,.15);
                    animation: thSoilOrbitReverse 12s linear infinite;
                }

                @keyframes thSoilOrbit {
                    to { transform: rotate(360deg); }
                }

                @keyframes thSoilOrbitReverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                .soil-ground {
                    position: absolute;
                    left: 9%;
                    right: 9%;
                    bottom: 0;
                    height: 32%;
                    border-radius: 28px 28px 0 0;
                    background:
                        radial-gradient(circle at 18% 28%, #aa815d 0 4px, transparent 5px),
                        radial-gradient(circle at 70% 32%, #745039 0 5px, transparent 6px),
                        radial-gradient(circle at 45% 68%, #b08a65 0 3px, transparent 4px),
                        linear-gradient(#80593d,#62432f);
                    box-shadow: inset 0 18px 30px rgba(255,255,255,.08);
                }

                .soil-scene {
                    position:absolute;
                    inset:0;
                    z-index:40;
                    display:block !important;
                    pointer-events:none;
                    opacity:0 !important;
                    visibility:hidden !important;
                    transition:opacity .35s ease, visibility .35s ease;
                }

                .soil-scene.is-active {
                    display:block !important;
                    opacity:1 !important;
                    visibility:visible !important;
                    z-index:60 !important;
                }

                .soil-checker-stage[data-check="texture"] .soil-scene-texture,
                .soil-checker-stage[data-check="water"] .soil-scene-water,
                .soil-checker-stage[data-check="ph"] .soil-scene-ph,
                .soil-checker-stage[data-check="plant"] .soil-scene-plant {
                    opacity:1;
                    visibility:visible;
                }

                /* 01 — dua tangan menadah tanah */
                .texture-soil-lump {
                    position:absolute;
                    left:50%;
                    top:58%;
                    width:118px;
                    height:66px;
                    transform:translate(-50%,-50%);
                    border-radius:55% 48% 45% 52%;
                    background:linear-gradient(145deg,#8d6345,#65432e);
                    box-shadow:0 15px 25px rgba(68,45,30,.18);
                    z-index:3;
                }
                .texture-soil-lump::before,.texture-soil-lump::after {
                    content:""; position:absolute; width:9px; height:9px; border-radius:50%; background:#a67b57;
                }
                .texture-soil-lump::before{left:25px;top:18px}.texture-soil-lump::after{right:24px;bottom:16px}
                .soil-checker-stage.scanning .texture-soil-lump::before { animation:thSoilCrumbA 1.55s ease-in-out; }
                .soil-checker-stage.scanning .texture-soil-lump::after { animation:thSoilCrumbB 1.55s ease-in-out; }
                @keyframes thSoilCrumbA { 0%,100%{transform:translate(0,0)} 55%{transform:translate(5px,3px)} }
                @keyframes thSoilCrumbB { 0%,100%{transform:translate(0,0)} 55%{transform:translate(-5px,-2px)} }
                .texture-hand {
                    position:absolute;
                    top:45%;
                    width:145px;
                    height:155px;
                    background:linear-gradient(145deg,#f2bd91,#d9986d);
                    border:2px solid rgba(164,99,66,.45);
                    border-radius:65% 48% 42% 48%;
                    z-index:4;
                    box-shadow:0 15px 22px rgba(113,75,52,.12);
                }
                .texture-hand-left { left:31%; transform:rotate(30deg) translateY(20px); transform-origin:80% 85%; }
                .texture-hand-right { right:31%; transform:rotate(-30deg) translateY(20px); transform-origin:20% 85%; }
                .texture-hand::before {
                    content:""; position:absolute; width:68px; height:42px; background:inherit; border-radius:50%; top:4px; left:50%; transform:translateX(-50%);
                }
                .soil-checker-stage.scanning .texture-hand-left { animation:thSqueezeLeft 1.55s cubic-bezier(.22,.8,.25,1); }
                .soil-checker-stage.scanning .texture-hand-right { animation:thSqueezeRight 1.55s cubic-bezier(.22,.8,.25,1); }
                .soil-checker-stage.scanning .texture-soil-lump { animation:thSqueezeSoil 1.55s cubic-bezier(.22,.8,.25,1); }

                /* Tangan bergerak mendekat, menekan tanah sebentar, lalu kembali. */
                @keyframes thSqueezeLeft {
                    0%   { transform:rotate(30deg) translate(0,35px) scale(1); }
                    28%  { transform:rotate(22deg) translate(18px,8px) scale(.98); }
                    48%  { transform:rotate(12deg) translate(48px,-2px) scale(.93,1.03); }
                    62%  { transform:rotate(9deg) translate(53px,0) scale(.90,1.05); }
                    78%  { transform:rotate(18deg) translate(28px,7px) scale(.97); }
                    100% { transform:rotate(30deg) translate(0,20px) scale(1); }
                }
                @keyframes thSqueezeRight {
                    0%   { transform:rotate(-30deg) translate(0,35px) scale(1); }
                    28%  { transform:rotate(-22deg) translate(-18px,8px) scale(.98); }
                    48%  { transform:rotate(-12deg) translate(-48px,-2px) scale(.93,1.03); }
                    62%  { transform:rotate(-9deg) translate(-53px,0) scale(.90,1.05); }
                    78%  { transform:rotate(-18deg) translate(-28px,7px) scale(.97); }
                    100% { transform:rotate(-30deg) translate(0,20px) scale(1); }
                }
                @keyframes thSqueezeSoil {
                    0%,100% { transform:translate(-50%,-50%) scale(1,1); border-radius:55% 48% 45% 52%; }
                    42% { transform:translate(-50%,-50%) scale(.92,1.06); }
                    58% { transform:translate(-50%,-50%) scale(.76,1.18); border-radius:48% 52% 50% 46%; }
                    72% { transform:translate(-50%,-50%) scale(.88,1.09); }
                }

                /* 02 — watering can menyiram tanah */
                .watering-can { position:absolute; left:30%; top:27%; width:145px; height:110px; transform:rotate(-12deg); z-index:5; }
                .watering-can-body { position:absolute; left:28px; top:25px; width:82px; height:66px; border-radius:22px 28px 25px 25px; background:linear-gradient(145deg,#3f9be8,#1670c8); box-shadow:inset 7px 5px 0 rgba(255,255,255,.16),0 15px 20px rgba(35,91,138,.16); }
                .watering-can-handle { position:absolute; left:38px; top:0; width:70px; height:58px; border:10px solid #1670c8; border-bottom:0; border-radius:50px 50px 0 0; transform:rotate(-8deg); }
                .watering-can-spout { position:absolute; left:92px; top:45px; width:52px; height:18px; background:#2a85da; border-radius:18px; transform:rotate(-9deg); transform-origin:left center; }
                .watering-can-tip { position:absolute; left:132px; top:33px; width:22px; height:27px; background:#176fc4; border-radius:4px 10px 10px 4px; transform:rotate(-9deg); }
                .water-stream { position:absolute; left:64%; top:38%; width:10px; height:210px; border-radius:99px; background:linear-gradient(to bottom,rgba(86,180,255,.9),rgba(106,196,255,.1)); transform:rotate(15deg); transform-origin:top; opacity:0; }
                .water-drops i { position:absolute; width:13px; height:20px; border-radius:70% 70% 70% 10%; background:#73c8ff; transform:rotate(45deg); opacity:0; }
                .water-drops i:nth-child(1){left:58%;top:52%}.water-drops i:nth-child(2){left:62%;top:57%}.water-drops i:nth-child(3){left:66%;top:54%}.water-drops i:nth-child(4){left:60%;top:63%}.water-drops i:nth-child(5){left:69%;top:61%}
                .water-ripple { position:absolute; left:50%; bottom:25%; width:95px; height:20px; border:3px solid rgba(76,174,231,.55); border-radius:50%; opacity:0; transform:translateX(-50%) scale(.4); }
                .soil-checker-stage.scanning .watering-can { animation:thCanPour 1.3s ease-in-out; }
                .soil-checker-stage.scanning .water-stream { animation:thStream 1.1s ease-out .15s; }
                .soil-checker-stage.scanning .water-drops i { animation:thDrop .9s ease-in infinite; }
                .soil-checker-stage.scanning .water-drops i:nth-child(2){animation-delay:.12s}.soil-checker-stage.scanning .water-drops i:nth-child(3){animation-delay:.24s}.soil-checker-stage.scanning .water-drops i:nth-child(4){animation-delay:.36s}.soil-checker-stage.scanning .water-drops i:nth-child(5){animation-delay:.48s}
                .soil-checker-stage.scanning .water-ripple { animation:thRipple 1.1s ease-out .45s; }
                @keyframes thCanPour {0%,100%{transform:rotate(-12deg) translateY(0)}45%{transform:rotate(-25deg) translateY(8px)}}
                @keyframes thStream {0%{opacity:0;transform:rotate(15deg) scaleY(.1)}25%{opacity:1}100%{opacity:0;transform:rotate(15deg) scaleY(1)}}
                @keyframes thDrop {0%{opacity:0;transform:translateY(-10px) rotate(45deg)}30%{opacity:1}100%{opacity:0;transform:translateY(75px) rotate(45deg)}}
                @keyframes thRipple {0%{opacity:0;transform:translateX(-50%) scale(.4)}40%{opacity:1}100%{opacity:0;transform:translateX(-50%) scale(1.6)}}

                /* 03 — alat pH */
                .ph-meter { position:absolute; left:50%; top:31%; width:150px; height:250px; transform:translateX(-50%); z-index:5; }
                .ph-meter-body { position:absolute; left:30px; top:0; width:90px; height:135px; border-radius:22px; background:linear-gradient(145deg,#f4f7f2,#dce8d8); border:3px solid #6e9272; box-shadow:0 14px 25px rgba(50,91,57,.15); }
                .ph-meter-screen { position:absolute; z-index:2; left:42px; top:20px; width:66px; padding:10px 4px; border-radius:10px; text-align:center; background:#294b36; color:#fff; font-size:11px; }
                .ph-meter-screen strong{display:block;font-size:25px;margin-top:4px}.ph-meter-probe{position:absolute;left:70px;top:125px;width:12px;height:125px;border-radius:10px;background:linear-gradient(#8ca48c,#5d765f);box-shadow:0 0 0 3px rgba(255,255,255,.7)}
                .soil-checker-stage.scanning .ph-meter { animation:thPhDip 1.25s ease-in-out; }
                .soil-checker-stage.scanning .ph-glow { animation:thPhGlow 1.2s ease-out; }
                .ph-glow {position:absolute;left:50%;top:58%;width:90px;height:35px;border-radius:50%;border:3px solid rgba(93,151,103,.55);transform:translate(-50%,-50%);opacity:0}
                @keyframes thPhDip{0%,100%{transform:translateX(-50%) translateY(0)}45%{transform:translateX(-50%) translateY(80px)}}
                @keyframes thPhGlow{0%{opacity:0;transform:translate(-50%,-50%) scale(.5)}40%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) scale(1.8)}}

                /* 04 — pertumbuhan bertahap */
                .growth-stage { position:absolute; left:50%; bottom:24%; transform:translateX(-50%) scale(.55); opacity:0; transform-origin:bottom center; filter:drop-shadow(0 14px 10px rgba(44,73,49,.12)); }
                .growth-seed {font-size:65px}.growth-sprout{font-size:92px}.growth-young{font-size:145px}.growth-tree{font-size:215px}
                .growth-seed{opacity:1;transform:translateX(-50%) scale(1)}
                .soil-checker-stage.scanning .growth-seed{animation:thGrowthSeed 1s forwards}.soil-checker-stage.scanning .growth-sprout{animation:thGrowthSprout 1s 1s forwards}.soil-checker-stage.scanning .growth-young{animation:thGrowthYoung 1s 2s forwards}.soil-checker-stage.scanning .growth-tree{animation:thGrowthTree 1.2s 3s forwards}
                @keyframes thGrowthSeed{0%{opacity:1;transform:translateX(-50%) scale(1)}85%{opacity:1}100%{opacity:0;transform:translateX(-50%) scale(.55)}}
                @keyframes thGrowthSprout{0%{opacity:0;transform:translateX(-50%) scale(.2)}100%{opacity:1;transform:translateX(-50%) scale(1)}}
                @keyframes thGrowthYoung{0%{opacity:0;transform:translateX(-50%) scale(.35)}100%{opacity:1;transform:translateX(-50%) scale(1)}}
                @keyframes thGrowthTree{0%{opacity:0;transform:translateX(-50%) scale(.25)}70%{opacity:1;transform:translateX(-50%) scale(1.08)}100%{opacity:1;transform:translateX(-50%) scale(1)}}



                .scanner-probe {
                    position: absolute;
                    top: 12%;
                    left: 50%;
                    width: 8px;
                    height: 235px;
                    transform: translateX(-50%);
                    border-radius: 20px;
                    background: linear-gradient(to bottom,#294b36 0 70%,#9b7656 70% 100%);
                    z-index: 8;
                    transition: transform .5s ease;
                }

                .scanner-probe::before {
                    content: "⌁";
                    position: absolute;
                    top: -42px;
                    left: 50%;
                    transform: translateX(-50%);
                    color: #294b36;
                    font-size: 30px;
                }

                .scanner-probe::after {
                    content: "";
                    position: absolute;
                    bottom: -12px;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    transform: translateX(-50%) rotate(45deg);
                    border-radius: 4px;
                    background: #9b7656;
                }

                .soil-checker-stage.scanning .scanner-probe {
                    animation: thProbeScan 1.25s ease-in-out;
                }

                @keyframes thProbeScan {
                    0% { transform: translate(-50%,0); }
                    45% { transform: translate(-50%,150px); }
                    75% { transform: translate(-50%,110px); }
                    100% { transform: translate(-50%,0); }
                }

                .scan-ring {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(77,117,87,.55);
                    border-radius: 50%;
                    opacity: 0;
                    z-index: 6;
                }

                .soil-checker-stage.scanning .scan-ring {
                    animation: thScanPulse 1.2s ease-out;
                }

                @keyframes thScanPulse {
                    0% { width:40px;height:40px;opacity:.8; }
                    100% { width:360px;height:360px;opacity:0; }
                }

                .checker-status {
                    position: absolute;
                    top: 28px;
                    left: 28px;
                    z-index: 10;
                    padding: 9px 14px;
                    border-radius: 999px;
                    background: rgba(255,255,255,.78);
                    backdrop-filter: blur(10px);
                    color: #294b36;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: .08em;
                }

                .soil-checker-controls {
                    position: relative;
                    z-index: 20;
                    padding: 48px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: #fff;
                }

                .soil-checker-controls .eyebrow {
                    margin-bottom: 12px;
                    color: #6d8960;
                    font-size: 10px;
                    font-weight: 900;
                    letter-spacing: .16em;
                }

                .soil-checker-controls h3 {
                    margin: 0 0 12px;
                    color: #294b36;
                    font-size: clamp(30px,4vw,46px);
                    line-height: 1;
                }

                .soil-checker-controls > p {
                    margin: 0 0 24px;
                    color: #687168;
                    line-height: 1.75;
                    font-size: 14px;
                }

                .checker-options {
                    position: relative;
                    z-index: 30;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }

                .checker-option {
                    position: relative;
                    border: 1px solid #e3eae0;
                    border-radius: 17px;
                    padding: 14px;
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    text-align: left;
                    background: #f7f9f5;
                    color: #294b36;
                    cursor: pointer;
                    transition: transform .22s ease,background .22s ease,
                                box-shadow .22s ease,border-color .22s ease;
                    font: inherit;
                    pointer-events: auto;
                    -webkit-tap-highlight-color: transparent;
                    touch-action: manipulation;
                }

                .checker-option:focus-visible {
                    outline: 3px solid rgba(91,129,95,.35);
                    outline-offset: 3px;
                }

                .checker-option:hover {
                    transform: translateY(-3px);
                    border-color: #a8bba1;
                    box-shadow: 0 10px 25px rgba(41,75,54,.08);
                }

                .checker-option.active {
                    background: #294b36;
                    color: #fff;
                    border-color: #294b36;
                    box-shadow: 0 13px 28px rgba(41,75,54,.18);
                }

                .checker-option-icon {
                    width: 40px;
                    height: 40px;
                    flex: 0 0 40px;
                    display: grid;
                    place-items: center;
                    border-radius: 12px;
                    background: #e5eee1;
                    font-size: 20px;
                }

                .checker-option.active .checker-option-icon {
                    background: rgba(255,255,255,.15);
                }

                .checker-option-copy {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    min-width: 0;
                }

                .checker-option-copy small {
                    font-size: 9px;
                    opacity: .6;
                    letter-spacing: .1em;
                }

                .checker-option-copy strong {
                    font-size: 13px;
                }

                .checker-option-copy em {
                    font-style: normal;
                    color: #7b857d;
                    font-size: 10px;
                }

                .checker-option.active .checker-option-copy em {
                    color: rgba(255,255,255,.65);
                }

                .checker-option-arrow {
                    margin-left: auto;
                    opacity: .45;
                }

                .checker-result {
                    margin-top: 20px;
                    padding: 20px;
                    border-radius: 20px;
                    background: #f1f5ee;
                    opacity: 0;
                    transform: translateY(12px);
                    transition: opacity .35s ease,transform .35s ease;
                }

                .checker-result.pop {
                    opacity: 1;
                    transform: translateY(0);
                }

                .checker-result-label {
                    margin-bottom: 6px;
                    color: #78916d;
                    font-size: 9px;
                    font-weight: 900;
                    letter-spacing: .12em;
                }

                .checker-result h4 {
                    margin: 0 0 7px;
                    color: #294b36;
                    font-size: 18px;
                }

                .checker-result p {
                    margin: 0;
                    color: #687168;
                    font-size: 12px;
                    line-height: 1.7;
                }

                .checker-meter {
                    margin-top: 15px;
                }

                .checker-meter-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 6px;
                    color: #637066;
                    font-size: 10px;
                }

                .checker-meter-track {
                    height: 6px;
                    overflow: hidden;
                    border-radius: 99px;
                    background: #dce5d8;
                }

                .checker-meter-fill {
                    width: 0;
                    height: 100%;
                    border-radius: inherit;
                    background: #5d815f;
                    transition: width 1s cubic-bezier(.22,1,.36,1);
                }

                /* V13 HARD VISUAL RESET — scene Section 12 harus selalu terlihat */
                .soil-checker-stage .soil-scene.is-active,
                .soil-checker-stage .soil-scene.is-active * {
                    visibility: visible !important;
                }

                .soil-checker-stage .soil-scene.is-active .texture-hand,
                .soil-checker-stage .soil-scene.is-active .texture-soil-lump,
                .soil-checker-stage .soil-scene.is-active .watering-can,
                .soil-checker-stage .soil-scene.is-active .water-stream,
                .soil-checker-stage .soil-scene.is-active .water-drops,
                .soil-checker-stage .soil-scene.is-active .water-ripple,
                .soil-checker-stage .soil-scene.is-active .ph-meter,
                .soil-checker-stage .soil-scene.is-active .ph-glow,
                .soil-checker-stage .soil-scene.is-active .growth-stage {
                    opacity: 1 !important;
                }

                .soil-checker-stage .soil-scene.is-active .water-stream,
                .soil-checker-stage .soil-scene.is-active .water-drops i,
                .soil-checker-stage .soil-scene.is-active .water-ripple,
                .soil-checker-stage .soil-scene.is-active .ph-glow {
                    opacity: 0 !important;
                }

                .soil-checker-stage .soil-scene.is-active .texture-hand,
                .soil-checker-stage .soil-scene.is-active .texture-soil-lump,
                .soil-checker-stage .soil-scene.is-active .watering-can,
                .soil-checker-stage .soil-scene.is-active .ph-meter,
                .soil-checker-stage .soil-scene.is-active .growth-stage {
                    display: block !important;
                }

                @media(max-width:850px) {
                    .soil-checker {
                        grid-template-columns: 1fr;
                    }

                    .soil-checker-stage {
                        min-height: 460px;
                    }

                    .soil-checker-controls {
                        padding: 34px 25px;
                    }
                }

                @media(max-width:520px) {
                    .soil-checker {
                        border-radius: 24px;
                    }

                    .soil-checker-stage {
                        min-height: 400px;
                    }

                    .checker-options {
                        grid-template-columns: 1fr;
                    }

                    .soil-checker-controls {
                        padding: 28px 20px;
                    }
                }

                @media(prefers-reduced-motion: reduce) {
                    .soil-checker-stage::before,
                    .soil-checker-stage::after,
                    .soil-plant {
                        animation: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        const summary = document.querySelector(".soil-summary");

        if (summary && !summary.dataset.interactiveReady) {
            summary.dataset.interactiveReady = "true";
            summary.classList.add("soil-checker-summary");

            summary.innerHTML = `
                <div class="section-heading">
                    <span class="section-label">12 — COBA SENDIRI</span>
                    <h2>Sebelum Menanam,<br>Kenali Tanahmu.</h2>
                    <p>
                        Sekarang giliran kamu jadi "peneliti tanah".
                        Pilih satu pemeriksaan dan lihat apa yang bisa
                        kita baca dari kondisi tanah.
                    </p>
                </div>

                <div class="soil-checker">

                    <div class="soil-checker-stage" aria-live="polite">
                        <div class="checker-status" id="checkerStatus">
                            Siap mengecek tanah
                        </div>

                        <div class="scan-ring"></div>

                        <div class="soil-scene soil-scene-texture" id="soilTextureScene" aria-hidden="true">
                            <div class="texture-hand texture-hand-left"></div>
                            <div class="texture-hand texture-hand-right"></div>
                            <div class="texture-soil-lump"></div>
                        </div>

                        <div class="soil-scene soil-scene-water" id="soilWaterScene" aria-hidden="true">
                            <div class="watering-can" aria-hidden="true">
                                <span class="watering-can-body"></span>
                                <span class="watering-can-handle"></span>
                                <span class="watering-can-spout"></span>
                                <span class="watering-can-tip"></span>
                            </div>
                            <div class="water-stream"></div>
                            <div class="water-drops"><i></i><i></i><i></i><i></i><i></i></div>
                            <div class="water-ripple"></div>
                        </div>

                        <div class="soil-scene soil-scene-ph" id="soilPhScene" aria-hidden="true">
                            <div class="ph-meter">
                                <div class="ph-meter-screen">pH <strong>6.5</strong></div>
                                <div class="ph-meter-body"></div>
                                <div class="ph-meter-probe"></div>
                            </div>
                            <div class="ph-glow"></div>
                        </div>

                        <div class="soil-scene soil-scene-plant" id="soilPlantScene" aria-hidden="true">
                            <div class="growth-stage growth-seed">🌰</div>
                            <div class="growth-stage growth-sprout">🌱</div>
                            <div class="growth-stage growth-young">🌿</div>
                            <div class="growth-stage growth-tree">🌳</div>
                        </div>

                        <div class="scanner-probe"></div>

                        <div class="soil-ground"></div>
                    </div>

                    <div class="soil-checker-controls">

                        <span class="eyebrow">INTERACTIVE SOIL CHECK</span>

                        <h3>Coba cek tanahmu.</h3>

                        <p>
                            Klik salah satu pemeriksaan. Alat akan
                            melakukan simulasi sederhana untuk menunjukkan
                            hal apa saja yang bisa kita pelajari dari tanah.
                        </p>

                        <div class="checker-options">

                            <button type="button" class="checker-option active" data-check="texture">
                                <span class="checker-option-icon">🖐️</span>
                                <span class="checker-option-copy">
                                    <small>01</small>
                                    <strong>Kenali Tekstur</strong>
                                    <em>Rasakan kondisi tanah</em>
                                </span>
                                <span class="checker-option-arrow">↗</span>
                            </button>

                            <button type="button" class="checker-option" data-check="water">
                                <span class="checker-option-icon">💧</span>
                                <span class="checker-option-copy">
                                    <small>02</small>
                                    <strong>Perhatikan Air</strong>
                                    <em>Lihat cara air bergerak</em>
                                </span>
                                <span class="checker-option-arrow">↗</span>
                            </button>

                            <button type="button" class="checker-option" data-check="ph">
                                <span class="checker-option-icon">⚗️</span>
                                <span class="checker-option-copy">
                                    <small>03</small>
                                    <strong>Kenali pH</strong>
                                    <em>Baca kondisi kimia</em>
                                </span>
                                <span class="checker-option-arrow">↗</span>
                            </button>

                            <button type="button" class="checker-option" data-check="plant">
                                <span class="checker-option-icon">🌱</span>
                                <span class="checker-option-copy">
                                    <small>04</small>
                                    <strong>Sesuaikan Tanaman</strong>
                                    <em>Cari tanaman yang cocok</em>
                                </span>
                                <span class="checker-option-arrow">↗</span>
                            </button>

                        </div>

                        <div class="checker-result pop" id="checkerResult">
                            <div class="checker-result-label">HASIL PEMBACAAN</div>

                            <h4 id="checkerResultTitle">
                                Tekstur memberi petunjuk pertama.
                            </h4>

                            <p id="checkerResultText">
                                Coba remas sedikit tanah yang lembap.
                                Kalau terasa kasar dan mudah buyar, kemungkinan
                                banyak pasir. Kalau bisa dibentuk dan terasa
                                lebih lengket, kandungan liatnya bisa lebih tinggi.
                            </p>

                            <div class="checker-meter">
                                <div class="checker-meter-top">
                                    <span id="checkerReadingLabel">Tekstur terdeteksi</span>
                                    <strong id="checkerReadingValue">62%</strong>
                                </div>

                                <div class="checker-meter-track">
                                    <div class="checker-meter-fill"
                                         id="checkerMeterFill"
                                         style="width:62%"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            `;

            const checkerData = {
                texture: {
                    status: "Membaca tekstur...",
                    reading: "Tekstur terdeteksi",
                    title: "Tekstur memberi petunjuk pertama.",
                    text: "Coba remas sedikit tanah yang lembap. Kalau terasa kasar dan mudah buyar, kemungkinan banyak pasir. Kalau bisa dibentuk dan terasa lebih lengket, kandungan liatnya bisa lebih tinggi.",
                    meter: 62
                },
                water: {
                    status: "Melacak aliran air...",
                    reading: "Gerak air terbaca",
                    title: "Air tidak cuma soal ada atau tidak ada.",
                    text: "Perhatikan setelah disiram: apakah air langsung hilang, meresap perlahan, atau justru menggenang? Dari sini kita mendapat petunjuk tentang drainase dan ruang pori tanah.",
                    meter: 78
                },
                ph: {
                    status: "Menganalisis pH...",
                    reading: "Kondisi kimia terbaca",
                    title: "pH membantu membaca kondisi kimia tanah.",
                    text: "pH tidak menentukan tanah itu bagus atau jelek. Nilainya membantu kita memahami kondisi kimia tanah dan apakah unsur tertentu lebih mudah tersedia bagi tanaman.",
                    meter: 54
                },
                plant: {
                    status: "Mencocokkan tanaman...",
                    reading: "Kebutuhan tanaman",
                    title: "Tanaman yang cocok dimulai dari tanahnya.",
                    text: "Setelah mengenali tekstur, air, dan pH, barulah kita bisa berpikir tentang tanaman yang sesuai. Jadi bukan sekadar mau tanam apa, tapi tanahmu mampu mendukung apa?",
                    meter: 88
                }
            };

            const stage = summary.querySelector(".soil-checker-stage");
            const status = summary.querySelector("#checkerStatus");
            const result = summary.querySelector("#checkerResult");
            const resultTitle = summary.querySelector("#checkerResultTitle");
            const resultText = summary.querySelector("#checkerResultText");
            const readingLabel = summary.querySelector("#checkerReadingLabel");
            const readingValue = summary.querySelector("#checkerReadingValue");
            const meter = summary.querySelector("#checkerMeterFill");
            const plant = summary.querySelector("#soilCheckerPlant");
            const options = summary.querySelectorAll(".checker-option");

            let soilCheckTimer = null;

            function runSoilCheck(type) {
                const item = checkerData[type];
                if (!item) return;

                options.forEach(option => {
                    option.classList.toggle("active", option.dataset.check === type);
                    option.setAttribute("aria-pressed", option.dataset.check === type ? "true" : "false");
                });

                stage.classList.remove("scanning");
                stage.dataset.check = type;
                showScene(type);
                void stage.offsetWidth;
                stage.classList.add("scanning");

                status.textContent = item.status;
                readingLabel.textContent = "Sedang dianalisis...";
                readingValue.textContent = "•••";
                meter.style.width = "10%";

                result.classList.remove("pop");
                void result.offsetWidth;
                result.classList.add("pop");

                if (soilCheckTimer) clearTimeout(soilCheckTimer);
                soilCheckTimer = setTimeout(() => {
                    status.textContent = "Pengecekan selesai";
                    readingLabel.textContent = item.reading;
                    readingValue.textContent = `${item.meter}%`;
                    resultTitle.textContent = item.title;
                    resultText.textContent = item.text;
                    meter.style.width = `${item.meter}%`;
                }, 850);
            }

            // FIX V12: kontrol langsung + paksa scene tampil.
            // Ini sengaja tidak bergantung pada event delegation atau CSS
            // selector eksternal supaya kartu tetap bisa diklik walaupun
            // ada style/script lama yang ikut memengaruhi Section 12.
            const scenes = {
                texture: summary.querySelector("#soilTextureScene"),
                water: summary.querySelector("#soilWaterScene"),
                ph: summary.querySelector("#soilPhScene"),
                plant: summary.querySelector("#soilPlantScene")
            };

            function showScene(type) {
                Object.entries(scenes).forEach(([key, scene]) => {
                    if (!scene) return;
                    const active = key === type;
                    scene.classList.toggle("is-active", active);
                    scene.style.setProperty("display", active ? "block" : "none", "important");
                    scene.style.setProperty("opacity", active ? "1" : "0", "important");
                    scene.style.setProperty("visibility", active ? "visible" : "hidden", "important");
                    scene.style.setProperty("z-index", active ? "60" : "0", "important");
                });
            }

            options.forEach(option => {
                option.setAttribute("aria-pressed", option.classList.contains("active") ? "true" : "false");
                option.onclick = (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    runSoilCheck(option.dataset.check);
                };
            });

            // Pastikan visual awal langsung muncul.
            stage.dataset.check = "texture";
            showScene("texture");
            runSoilCheck("texture");
        }
    }

    /* =========================================================
   TANAHITA — TEXTURE SQUEEZE DIRECT ANIMATION
   ========================================================= */

const textureCard = document.querySelector('.checker-option[data-check="texture"]');

function animateTextureSqueeze() {
    const leftHand = document.querySelector('.texture-hand-left');
    const rightHand = document.querySelector('.texture-hand-right');
    const soil = document.querySelector('.texture-soil-lump');

    if (!leftHand || !rightHand || !soil) {
        console.warn("TANAHITA: elemen squeeze tidak ditemukan.");
        return;
    }

    // Hentikan animasi sebelumnya kalau masih berjalan
    leftHand.getAnimations().forEach(a => a.cancel());
    rightHand.getAnimations().forEach(a => a.cancel());
    soil.getAnimations().forEach(a => a.cancel());

    // TANGAN KIRI
    leftHand.animate([
        {
            transform: 'rotate(30deg) translate(0,35px) scale(1)',
            offset: 0
        },
        {
            transform: 'rotate(22deg) translate(18px,8px) scale(.98)',
            offset: .28
        },
        {
            transform: 'rotate(12deg) translate(48px,-2px) scale(.93,1.03)',
            offset: .48
        },
        {
            transform: 'rotate(9deg) translate(53px,0) scale(.90,1.05)',
            offset: .62
        },
        {
            transform: 'rotate(18deg) translate(28px,7px) scale(.97)',
            offset: .78
        },
        {
            transform: 'rotate(30deg) translate(0,20px) scale(1)',
            offset: 1
        }
    ], {
        duration: 1550,
        easing: 'cubic-bezier(.22,.8,.25,1)',
        fill: 'both'
    });

    // TANGAN KANAN
    rightHand.animate([
        {
            transform: 'rotate(-30deg) translate(0,35px) scale(1)',
            offset: 0
        },
        {
            transform: 'rotate(-22deg) translate(-18px,8px) scale(.98)',
            offset: .28
        },
        {
            transform: 'rotate(-12deg) translate(-48px,-2px) scale(.93,1.03)',
            offset: .48
        },
        {
            transform: 'rotate(-9deg) translate(-53px,0) scale(.90,1.05)',
            offset: .62
        },
        {
            transform: 'rotate(-18deg) translate(-28px,7px) scale(.97)',
            offset: .78
        },
        {
            transform: 'rotate(-30deg) translate(0,20px) scale(1)',
            offset: 1
        }
    ], {
        duration: 1550,
        easing: 'cubic-bezier(.22,.8,.25,1)',
        fill: 'both'
    });

    // TANAH DIREMAS
    soil.animate([
        {
            transform: 'translate(-50%,-50%) scale(1,1)',
            borderRadius: '55% 48% 45% 52%',
            offset: 0
        },
        {
            transform: 'translate(-50%,-50%) scale(.92,1.06)',
            borderRadius: '52% 50% 48% 50%',
            offset: .42
        },
        {
            transform: 'translate(-50%,-50%) scale(.76,1.18)',
            borderRadius: '48% 52% 50% 46%',
            offset: .58
        },
        {
            transform: 'translate(-50%,-50%) scale(.88,1.09)',
            borderRadius: '52% 49% 48% 50%',
            offset: .72
        },
        {
            transform: 'translate(-50%,-50%) scale(1,1)',
            borderRadius: '55% 48% 45% 52%',
            offset: 1
        }
    ], {
        duration: 1550,
        easing: 'cubic-bezier(.22,.8,.25,1)',
        fill: 'both'
    });
}

// =====================================================
// SECTION 12 — ANIMASI CEK TEKSTUR
// =====================================================

const soilCheckerStage = document.querySelector(".soil-checker-stage");
const textureCheckerButton = document.querySelector(
    '.checker-option[data-check="texture"]'
);

function playTextureSqueeze() {
    if (!soilCheckerStage) return;

    // Reset animasi
    soilCheckerStage.classList.remove("scanning");

    // Paksa browser membaca ulang layout
    void soilCheckerStage.offsetWidth;

    // Jalankan animasi
    soilCheckerStage.classList.add("scanning");
}

// Klik tombol "Kenali Tekstur"
if (textureCheckerButton) {
    textureCheckerButton.addEventListener("click", function () {
        playTextureSqueeze();
    });
}

// Animasi pertama kali saat Section 12 dibuka
setTimeout(() => {
    playTextureSqueeze();
}, 700);

/* =========================================================
   TANAHITA — SECTION 12 MINI LAB VISUAL FIX
   Visual dibuat ringan: tanah bulat, dua tangan, watering can,
   dan pertumbuhan biji → tunas → tanaman muda → pohon kecil.
   ========================================================= */
(() => {
    const lab = document.querySelector('.th-soil-lab');
    if (!lab || lab.dataset.visualFixReady === 'true') return;
    lab.dataset.visualFixReady = 'true';

    const styleId = 'tanahita-section12-mini-lab-fix';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
/* ---------- SECTION 12 BASE ---------- */
.th-soil-lab {
    position: relative;
    overflow: hidden;
}

.th-soil-lab-card {
    position: relative;
    z-index: 2;
}

.th-soil-lab-visual {
    position: relative;
    min-height: 610px;
    overflow: hidden;
    isolation: isolate;
    background:
        radial-gradient(circle at 50% 42%, rgba(255,255,255,.95) 0 15%, rgba(241,247,237,.9) 45%, rgba(224,236,219,.95) 100%);
}

.th-soil-lab-visual::after {
    content: '';
    position: absolute;
    left: 8%;
    right: 8%;
    bottom: 7%;
    height: 2px;
    background: rgba(62,94,67,.10);
    border-radius: 99px;
}

.th-soil-badge {
    position: absolute;
    top: 28px;
    left: 28px;
    z-index: 100;
    padding: 10px 15px;
    border-radius: 999px;
    background: rgba(255,255,255,.82);
    color: #31563c;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .14em;
    box-shadow: 0 8px 24px rgba(42,76,50,.08);
    backdrop-filter: blur(10px);
}

.th-soil-orbit {
    position: absolute;
    left: 50%;
    top: 43%;
    width: 390px;
    height: 390px;
    border: 1px solid rgba(76,112,81,.14);
    border-radius: 50%;
    transform: translate(-50%,-50%);
    pointer-events: none;
}

.orbit-two {
    width: 275px;
    height: 275px;
    border-style: dashed;
    opacity: .8;
}

/* ---------- SCENES ---------- */
.th-soil-scene {
    position: absolute;
    inset: 0;
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity .35s ease, visibility .35s ease;
}

.th-soil-scene.is-active {
    opacity: 1 !important;
    visibility: visible !important;
    z-index: 30;
}

.scene-caption {
    position: absolute;
    left: 50%;
    bottom: 12%;
    width: min(430px, 82%);
    transform: translateX(-50%);
    text-align: center;
    color: #667269;
    font-size: 12px;
    line-height: 1.65;
}

/* ---------- 01 TEXTURE: DUA TANGAN + TANAH BULAT ---------- */
.soil-lump {
    position: absolute;
    left: 50%;
    top: 43%;
    width: 170px;
    height: 150px;
    transform: translate(-50%,-50%);
    border-radius: 48% 52% 50% 46%;
    background:
        radial-gradient(circle at 30% 25%, rgba(196,151,111,.55) 0 4px, transparent 5px),
        radial-gradient(circle at 68% 35%, rgba(96,59,40,.42) 0 5px, transparent 6px),
        radial-gradient(circle at 42% 72%, rgba(85,53,36,.30) 0 4px, transparent 5px),
        linear-gradient(145deg, #966948, #70482f 65%, #5e3c29);
    box-shadow: 0 22px 35px rgba(75,48,31,.20), inset 10px 8px 18px rgba(255,255,255,.08);
    z-index: 8;
}

.soil-hand {
    position: absolute;
    top: 34%;
    width: 118px;
    height: 118px;
    z-index: 12;
    display: grid;
    place-items: center;
    font-size: 74px;
    line-height: 1;
    filter: drop-shadow(0 12px 12px rgba(87,60,43,.12));
    transform-origin: center bottom;
}

.hand-left {
    left: 25%;
    transform: rotate(18deg);
}

.hand-right {
    right: 25%;
    transform: rotate(-18deg) scaleX(-1);
}

.scene-texture.texture-active .hand-left {
    animation: thHandSqueezeLeft 1.35s cubic-bezier(.22,.8,.25,1);
}

.scene-texture.texture-active .hand-right {
    animation: thHandSqueezeRight 1.35s cubic-bezier(.22,.8,.25,1);
}

.scene-texture.texture-active .soil-lump {
    animation: thSoilSqueeze 1.35s cubic-bezier(.22,.8,.25,1);
}

@keyframes thHandSqueezeLeft {
    0%,100% { transform: rotate(18deg) translateX(0) scale(1); }
    42% { transform: rotate(7deg) translateX(36px) scale(.94); }
    58% { transform: rotate(4deg) translateX(43px) scale(.91); }
    78% { transform: rotate(12deg) translateX(18px) scale(.97); }
}

@keyframes thHandSqueezeRight {
    0%,100% { transform: rotate(-18deg) scaleX(-1) translateX(0) scale(1); }
    42% { transform: rotate(-7deg) scaleX(-1) translateX(36px) scale(.94); }
    58% { transform: rotate(-4deg) scaleX(-1) translateX(43px) scale(.91); }
    78% { transform: rotate(-12deg) scaleX(-1) translateX(18px) scale(.97); }
}

@keyframes thSoilSqueeze {
    0%,100% { transform: translate(-50%,-50%) scale(1); border-radius:48% 52% 50% 46%; }
    45% { transform: translate(-50%,-50%) scale(.90,1.05); border-radius:52% 46% 48% 51%; }
    60% { transform: translate(-50%,-50%) scale(.82,1.10); border-radius:45% 54% 49% 46%; }
    78% { transform: translate(-50%,-50%) scale(.93,1.04); }
}

.soil-particle {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #a97b57;
    opacity: .8;
}
.p1 { left: 38%; top: 34%; }
.p2 { left: 62%; top: 46%; }
.p3 { left: 46%; top: 54%; }

/* ---------- 02 WATER: WATERING CAN ---------- */
.watering-can {
    position: absolute;
    left: 27%;
    top: 24%;
    width: 165px;
    height: 130px;
    z-index: 14;
    transform: rotate(-9deg);
    filter: drop-shadow(0 13px 13px rgba(50,86,112,.12));
}

.can-body {
    position: absolute;
    left: 18px;
    top: 38px;
    width: 86px;
    height: 66px;
    border-radius: 24px 28px 23px 22px;
    background: linear-gradient(145deg,#78b8ee,#347fc4);
    box-shadow: inset 7px 5px 0 rgba(255,255,255,.20);
}

.can-handle {
    position: absolute;
    left: 31px;
    top: 5px;
    width: 76px;
    height: 60px;
    border: 11px solid #347fc4;
    border-bottom: 0;
    border-radius: 50px 50px 0 0;
}

.can-spout {
    position: absolute;
    left: 91px;
    top: 59px;
    width: 61px;
    height: 17px;
    border-radius: 99px;
    background: #4c94d4;
    transform: rotate(-8deg);
    transform-origin: left center;
}

.can-rose {
    position: absolute;
    left: 140px;
    top: 42px;
    width: 25px;
    height: 31px;
    border-radius: 8px 14px 14px 8px;
    background: #2f78bc;
    transform: rotate(-8deg);
}

.can-rose::after {
    content: '';
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    background: radial-gradient(circle, #cfeeff 0 2px, transparent 3px) 0 0/8px 8px;
}

.scene-water.is-active .watering-can {
    animation: thWaterCan 1.25s ease-in-out;
}

.water-stream {
    position: absolute;
    left: 64%;
    top: 37%;
    width: 9px;
    height: 185px;
    border-radius: 99px;
    background: linear-gradient(to bottom, rgba(91,185,255,.9), rgba(91,185,255,.08));
    transform: rotate(14deg) scaleY(.05);
    transform-origin: top center;
    opacity: 0;
}

.scene-water.is-active .water-stream {
    animation: thWaterStream 1s .12s ease-out forwards;
}

.water-drop {
    position: absolute;
    width: 12px;
    height: 18px;
    border-radius: 70% 70% 70% 12%;
    background: #70c6ff;
    opacity: 0;
    transform: rotate(45deg);
}

.d1 { left: 57%; top: 52%; }
.d2 { left: 62%; top: 58%; }
.d3 { left: 67%; top: 55%; }

.scene-water.is-active .d1 { animation: thDrop .8s .18s ease-out forwards; }
.scene-water.is-active .d2 { animation: thDrop .8s .32s ease-out forwards; }
.scene-water.is-active .d3 { animation: thDrop .8s .46s ease-out forwards; }

.soil-puddle {
    position: absolute;
    left: 50%;
    bottom: 25%;
    width: 190px;
    height: 62px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(93,62,43,.82), rgba(112,75,50,.92));
    box-shadow: 0 15px 25px rgba(75,48,31,.16);
}

.scene-water.is-active .soil-puddle {
    animation: thPuddle .9s ease-out;
}

@keyframes thWaterCan {
    0%,100% { transform: rotate(-9deg) translateY(0); }
    45% { transform: rotate(-25deg) translateY(9px); }
}
@keyframes thWaterStream {
    0% { opacity: 0; transform: rotate(14deg) scaleY(.05); }
    25% { opacity: 1; }
    100% { opacity: 0; transform: rotate(14deg) scaleY(1); }
}
@keyframes thDrop {
    0% { opacity: 0; transform: translateY(-8px) rotate(45deg); }
    25% { opacity: 1; }
    100% { opacity: 0; transform: translateY(82px) rotate(45deg); }
}
@keyframes thPuddle {
    0% { transform: translateX(-50%) scale(.65); opacity: .4; }
    55% { transform: translateX(-50%) scale(1.08); opacity: 1; }
    100% { transform: translateX(-50%) scale(1); opacity: 1; }
}

/* ---------- 03 PH ---------- */
.ph-card {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    width: 150px;
    padding: 22px 18px;
    border-radius: 24px;
    background: rgba(255,255,255,.9);
    border: 1px solid rgba(65,100,69,.12);
    box-shadow: 0 20px 40px rgba(45,77,50,.10);
    text-align: center;
    color: #31563c;
}
.ph-card span { display:block; font-size:11px; letter-spacing:.12em; font-weight:900; }
.ph-card strong { display:block; font-size:42px; line-height:1; margin:9px 0 5px; }
.ph-card small { color:#758078; }

.ph-strip {
    position: absolute;
    left: 50%;
    top: 54%;
    width: 280px;
    height: 18px;
    transform: translateX(-50%);
    border-radius: 99px;
    background: linear-gradient(90deg,#d98c8c,#e4bb78,#b6cf7d,#6aa7b8,#7b83bf);
    box-shadow: 0 8px 18px rgba(63,86,67,.12);
}

.ph-dot {
    position: absolute;
    top: 59%;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #31563c;
}
.dot-a { left: 34%; }
.dot-b { left: 50%; }
.dot-c { left: 66%; }

.scene-ph.is-active .ph-card { animation: thPhFloat .8s ease-out; }
.scene-ph.is-active .ph-strip { animation: thPhReveal .9s ease-out; }
@keyframes thPhFloat { from { opacity:0; transform:translate(-50%,12px); } to { opacity:1; transform:translate(-50%,0); } }
@keyframes thPhReveal { from { opacity:0; transform:translateX(-50%) scaleX(.55); } to { opacity:1; transform:translateX(-50%) scaleX(1); } }

/* ---------- 04 GROWTH ---------- */
.scene-plant::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 25%;
    width: 220px;
    height: 74px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: linear-gradient(145deg,#8e6042,#69452f);
    box-shadow: 0 18px 28px rgba(72,46,31,.16);
}

.growth {
    position: absolute;
    left: 50%;
    bottom: 30%;
    transform: translateX(-50%) scale(.7);
    transform-origin: bottom center;
    opacity: 0;
    z-index: 8;
    filter: drop-shadow(0 12px 9px rgba(45,75,48,.12));
}

.growth-seed { font-size: 54px; }
.growth-sprout { font-size: 90px; }
.growth-young { font-size: 135px; }
.growth-tree { font-size: 185px; }

.scene-plant.is-active .growth-seed { animation: thSeed 1s ease forwards; }
.scene-plant.is-active .growth-sprout { animation: thSprout 1s 1s ease forwards; }
.scene-plant.is-active .growth-young { animation: thYoung 1s 2s ease forwards; }
.scene-plant.is-active .growth-tree { animation: thTree 1.1s 3s cubic-bezier(.2,.8,.2,1) forwards; }

@keyframes thSeed {
    0% { opacity:1; transform:translateX(-50%) scale(1); }
    80% { opacity:1; }
    100% { opacity:0; transform:translateX(-50%) scale(.55) translateY(10px); }
}
@keyframes thSprout {
    0% { opacity:0; transform:translateX(-50%) scale(.2); }
    70% { opacity:1; transform:translateX(-50%) scale(1.05); }
    100% { opacity:1; transform:translateX(-50%) scale(1); }
}
@keyframes thYoung {
    0% { opacity:0; transform:translateX(-50%) scale(.25); }
    70% { opacity:1; transform:translateX(-50%) scale(1.06); }
    100% { opacity:1; transform:translateX(-50%) scale(1); }
}
@keyframes thTree {
    0% { opacity:0; transform:translateX(-50%) scale(.18); }
    70% { opacity:1; transform:translateX(-50%) scale(1.08); }
    100% { opacity:1; transform:translateX(-50%) scale(1); }
}

.growth-label,
.growth-arrow { position:absolute; opacity:0; z-index:10; }
.growth-label { color:#52675a; font-size:10px; font-weight:800; letter-spacing:.04em; }
.growth-arrow { color:#7b947c; font-size:20px; }
.label-seed { left: 25%; bottom: 22%; }
.label-sprout { left: 39%; bottom: 22%; }
.label-young { right: 34%; bottom: 22%; }
.label-tree { right: 19%; bottom: 22%; }
.arrow-a { left: 35%; bottom: 29%; }
.arrow-b { left: 48%; bottom: 29%; }
.arrow-c { left: 62%; bottom: 29%; }

.scene-plant.is-active .label-seed,
.scene-plant.is-active .label-sprout,
.scene-plant.is-active .label-young,
.scene-plant.is-active .label-tree,
.scene-plant.is-active .arrow-a,
.scene-plant.is-active .arrow-b,
.scene-plant.is-active .arrow-c { animation: thLabels .6s 3.9s ease forwards; }

@keyframes thLabels { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }

/* ---------- CONTENT ---------- */
.th-soil-lab-content { position:relative; z-index:50; }
.th-soil-tab { cursor:pointer !important; pointer-events:auto !important; }
.th-soil-tab:focus-visible { outline:3px solid rgba(79,118,87,.25); outline-offset:3px; }
.th-soil-tab.active { box-shadow:0 12px 25px rgba(41,75,54,.13); }
.th-soil-info.is-changing { animation: thInfoIn .32s ease; }
@keyframes thInfoIn { from { opacity:.35; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

@media (max-width: 850px) {
    .th-soil-lab-visual { min-height: 500px; }
    .th-soil-orbit { width:330px; height:330px; }
    .soil-hand { font-size:62px; width:100px; }
    .soil-lump { width:145px; height:130px; }
}

@media (max-width: 560px) {
    .th-soil-lab-visual { min-height:430px; }
    .th-soil-badge { top:18px; left:18px; }
    .th-soil-orbit { width:280px; height:280px; }
    .soil-hand { font-size:52px; width:85px; }
    .hand-left { left:20%; }
    .hand-right { right:20%; }
    .soil-lump { width:125px; height:112px; }
    .watering-can { left:17%; transform:scale(.82) rotate(-9deg); transform-origin:left top; }
    .ph-strip { width:230px; }
    .growth-tree { font-size:145px; }
}

@media (prefers-reduced-motion: reduce) {
    .th-soil-scene,
    .th-soil-info { transition:none !important; }
    .scene-texture.texture-active .hand-left,
    .scene-texture.texture-active .hand-right,
    .scene-texture.texture-active .soil-lump,
    .scene-water.is-active .watering-can,
    .scene-water.is-active .water-stream,
    .scene-water.is-active .water-drop,
    .scene-water.is-active .soil-puddle,
    .scene-ph.is-active .ph-card,
    .scene-ph.is-active .ph-strip,
    .scene-plant.is-active .growth,
    .scene-plant.is-active .growth-label,
    .scene-plant.is-active .growth-arrow { animation:none !important; }
    .scene-plant.is-active .growth-seed { opacity:1; }
}
        `;
        document.head.appendChild(style);
    }

    const tabs = lab.querySelectorAll('.th-soil-tab');
    const scenes = lab.querySelectorAll('.th-soil-scene');
    const info = lab.querySelector('#thSoilInfo');

    function restartScene(scene, type) {
        if (!scene) return;
        scene.classList.remove('is-active');
        if (type === 'texture') scene.classList.remove('texture-active');
        void scene.offsetWidth;
        scene.classList.add('is-active');
        if (type === 'texture') {
            void scene.offsetWidth;
            scene.classList.add('texture-active');
        }
    }

    function syncScene(type) {
        scenes.forEach(scene => {
            const active = scene.dataset.scene === type;
            if (active) {
                scene.classList.add('is-active');
                scene.style.setProperty('visibility', 'visible', 'important');
                scene.style.setProperty('opacity', '1', 'important');
                scene.style.setProperty('z-index', '30', 'important');
            } else {
                scene.classList.remove('is-active', 'texture-active');
                scene.style.setProperty('visibility', 'hidden', 'important');
                scene.style.setProperty('opacity', '0', 'important');
                scene.style.setProperty('z-index', '0', 'important');
            }
        });

        const scene = lab.querySelector('.th-soil-scene[data-scene="' + type + '"]');
        restartScene(scene, type);
        if (info) {
            info.classList.remove('is-changing');
            void info.offsetWidth;
            info.classList.add('is-changing');
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const type = tab.dataset.soilTab;
            if (!type) return;
            syncScene(type);
        });
    });

    const initial = lab.querySelector('.th-soil-tab.active')?.dataset.soilTab || 'texture';
    setTimeout(() => syncScene(initial), 120);
})();

});
