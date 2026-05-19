const GAME_DATA = {
  initialHP: 50,
  maxHP: 100,
  totalDays: 7,
  sleepBonus: 15,

  mealOrder: ['morning', 'lunch', 'snack', 'dinner'],
  mealMeta: {
    morning: { label: '☀️ Matin',    time: '07:30', dot: 'Matin' },
    lunch:   { label: '🌞 Déjeuner', time: '12:30', dot: 'Déjeuner' },
    snack:   { label: '🌤️ Goûter',  time: '16:00', dot: 'Goûter' },
    dinner:  { label: '🌙 Dîner',    time: '19:30', dot: 'Dîner' }
  },

  pools: {

    /* ═══════════════════════════════
       ☀️  MATIN  (5 scenarios)
    ═══════════════════════════════ */
    morning: [
      {
        location: "Café de Turin", emoji: "☕",
        intro: "니스, 오전 7시 30분. 가리발디 광장의 유서 깊은 카페에서 하루를 시작하자.",
        interactions: [
          {
            setup: "카페 문을 열고 들어섰다. 앞치마를 두른 웨이터가 다가온다.",
            npcName: "Serveur", npcFrench: '"Bonjour ! Bienvenue !"',
            npcMeaning: "안녕하세요! 어서 오세요!",
            options: [
              { text: "Bonjour !\nUne table pour une personne,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 1인 자리 부탁해요.",
                feedback: "웨이터가 미소를 지으며 광장이 보이는 자리로 안내해 준다. 니스의 아침이 시작됐다! ✨" },
              { text: "Bonsoir !\nUne table pour deux,\ns'il vous plaît.", correct: false,
                feedback: "아침에 저녁 인사(Bonsoir)에 2인 테이블이라니! 웨이터가 의아한 표정으로 구석 자리에 안내한다. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "앉지도 않았는데 계산서를! 웨이터가 황당한 표정을 짓는다. 🤦" },
              { text: "Merci beaucoup !", correct: false,
                feedback: "감사하다고만 했다. 웨이터가 어리둥절해하며 돌아간다. 😶" }
            ],
            hpChange: { success: 5, fail: -10 }
          },
          {
            setup: "자리에 앉자 웨이터가 주문을 받으러 왔다. 배가 고프다.",
            npcName: "Serveur", npcFrench: '"Vous désirez ?"',
            npcMeaning: "무엇을 드릴까요?",
            options: [
              { text: "Un café au lait et\nune fougassette,\ns'il vous plaît.", correct: true,
                meaning: "카페오레와 푸가세트(오렌지꽃 향 니스 빵) 부탁해요.",
                feedback: "오렌지꽃 향 가득한 푸가세트와 카페오레! 가리발디 광장의 부드러운 아침. 🥖☕" },
              { text: "Deux cafés et\nun pain,\ns'il vous plaît.", correct: false,
                feedback: "혼자인데 커피 두 잔이 나왔다. 한 잔은 그냥 남겼다. ☕☕" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "'자고 싶다'고 했다. 웨이터가 황당한 표정으로 조용히 돌아간다. 결국 아무것도 못 먹었다. 😴" },
              { text: "La carte,\ns'il vous plaît.", correct: false,
                feedback: "주문 받으러 온 웨이터에게 메뉴판을 달라고 했다. 웨이터가 한숨을 쉬며 다른 손님에게 가버린다. 😮‍💨" }
            ],
            hpChange: { success: 25, fail: -15 }
          }
        ]
      },
      {
        location: "Boulangerie Multari", emoji: "🥖",
        intro: "오전 8시. 비외 니스의 유명 빵집 Multari. 작은 줄이 늘어서 있다.",
        interactions: [
          {
            setup: "줄을 서서 기다리다 차례가 됐다. 빵집 주인이 밝게 웃으며 물어본다.",
            npcName: "Boulanger", npcFrench: '"Bonjour ! Qu\'est-ce que je vous sers ?"',
            npcMeaning: "안녕하세요! 무엇으로 드릴까요?",
            options: [
              { text: "Bonjour !\nUn pain au chocolat et\nun jus d'orange, s'il vous plaît.", correct: true,
                meaning: "안녕하세요! 팽 오 쇼콜라 하나와 오렌지 주스 부탁해요.",
                feedback: "깔끔하고 정중한 주문! 갓 구운 팽 오 쇼콜라와 신선한 주스가 나왔다. 완벽한 아침! 🍫🥐🍊" },
              { text: "Bonjour !\nDeux croissants,\ns'il vous plaît.", correct: false,
                feedback: "크루아상 두 개가 나왔다. 팽 오 쇼콜라와 주스가 먹고 싶었는데... 가벼운 아침이 됐다. 🥐" },
              { text: "Je voudrais\nle plat du jour.", correct: false,
                feedback: "빵집에서 오늘의 특선을! 빵집 아저씨가 웃음을 터뜨린다. 😂" },
              { text: "Bonsoir !\nUn café,\ns'il vous plaît.", correct: false,
                feedback: "아침에 저녁 인사에 커피 한 잔. 아저씨가 이상한 눈으로 쳐다본다. 😕" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "빵과 주스를 받았다. 계산을 해야 할 시간.",
            npcName: "Boulanger", npcFrench: '"Ça fait trois euros cinquante."',
            npcMeaning: "3유로 50입니다.",
            options: [
              { text: "(돈을 건네며)\nVoilà ! Merci,\nbonne journée !", correct: true,
                meaning: "여기 있어요! 감사합니다, 좋은 하루 보내세요!",
                feedback: "'Merci, bonne journée !' 빵집 아저씨도 'Bonne journée !' 하며 환하게 웃는다. 💛" },
              { text: "C'est combien ?", correct: false,
                feedback: "방금 3유로 50이라고 했는데 또 얼마냐고? 아저씨가 한숨을 쉰다. 😮‍💨" },
              { text: "Non, merci.", correct: false,
                feedback: "'아니요'라고 했더니 빵을 다시 가져간다. 아침을 못 먹었다! 😭" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "빵집에서 레스토랑 용어 '라디씨옹'을? 아저씨가 어이없어하지만 그냥 받아준다. 😅" }
            ],
            hpChange: { success: 22, fail: -10 }
          }
        ]
      },
      {
        location: "Café Le Plongeoir", emoji: "🌊",
        intro: "오전 9시. 코코 비치 위 절벽의 카페. 바다가 한눈에 들어오는 테라스 자리를 노리자.",
        interactions: [
          {
            setup: "입구에서 웨이터가 자리를 안내하려 한다. 테라스 자리에 앉고 싶다.",
            npcName: "Serveur", npcFrench: '"Bonjour ! Vous avez une préférence ?"',
            npcMeaning: "안녕하세요! 자리 선호도가 있으신가요?",
            options: [
              { text: "Bonjour !\nEn terrasse,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 테라스 자리 부탁해요.",
                feedback: "Bien sûr ! 테라스 자리로 안내받았다. 베 데 장주(Baie des Anges)가 한눈에 펼쳐진다. ☀️🌊" },
              { text: "Bonjour !\nEn salle,\ns'il vous plaît.", correct: false,
                feedback: "'실내(en salle)'를 선택했다. 테라스가 더 좋았는데... 이미 앉아버렸다. 🏠" },
              { text: "Bonsoir !\nUne table pour deux.", correct: false,
                feedback: "오전에 저녁 인사? 2인용 자리까지? 웨이터가 고개를 갸웃한다. 😶" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "계산서를 달라고 했다. 웨이터가 당신을 이미 식사하고 나온 사람으로 착각한다. 😵" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "테라스 자리에 앉았다. 웨이터가 주문을 받으러 왔다.",
            npcName: "Serveur", npcFrench: '"Qu\'est-ce que vous prenez ?"',
            npcMeaning: "무엇으로 하시겠어요?",
            options: [
              { text: "Une tartine et\nun thé,\ns'il vous plaît.", correct: true,
                meaning: "타르틴(버터 바른 토스트)과 차 부탁해요.",
                feedback: "Excellent choix ! 토스트와 홍차가 나왔다. 절벽 위 테라스에서 마시는 니스의 아침. 🍵🥖" },
              { text: "Un steak frites,\ns'il vous plaît.", correct: false,
                feedback: "아침에 스테이크 프리트를? 웨이터가 놀라며 '저희는 아침 메뉴만 있어요'라고 한다. 🥩" },
              { text: "Deux cafés\net un croissant.", correct: false,
                feedback: "커피 두 잔에 크루아상 한 개. 혼자인데 커피가 두 잔이 나와 당황스럽다. ☕☕" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "테라스에서 자고 싶다고? 웨이터가 정중하게 다른 카페를 추천해준다. 😴" }
            ],
            hpChange: { success: 23, fail: -15 }
          }
        ]
      },
      {
        location: "Hôtel Negresco", emoji: "🏨",
        intro: "오전 7시. 프롬나드 데 장글레의 전설적인 호텔. 살롱 베르사유에서 조식.",
        interactions: [
          {
            setup: "호텔 식당 입구에서 직원이 묻는다. 숙박객임을 확인시켜 주자.",
            npcName: "Hôtesse", npcFrench: '"Bonjour ! Vous prenez le petit-déjeuner ?"',
            npcMeaning: "안녕하세요! 조식 드시러 오셨나요?",
            options: [
              { text: "Oui, bonjour !\nChambre 214,\ns'il vous plaît.", correct: true,
                meaning: "네, 안녕하세요! 214호입니다.",
                feedback: "직원이 명부를 확인하고 바다가 보이는 테이블로 안내한다. 조식 뷔페가 풍성하다! 🍳" },
              { text: "Non, je voudrais\nle plat du jour.", correct: false,
                feedback: "'아니요'라고 했더니 식당 이용이 불가하다고 한다. 배고프게 방으로 돌아갔다. 😢" },
              { text: "Bonsoir !\nUne table pour deux.", correct: false,
                feedback: "아침에 '봉수아'에 2인 테이블까지? 직원이 당황해한다. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "아직 먹지도 않았는데 계산서를? 직원이 어리둥절해한다. 🤦" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "자리에 앉으니 직원이 음료를 물어본다.",
            npcName: "Serveur", npcFrench: '"Café, thé ou chocolat chaud ?"',
            npcMeaning: "커피, 차, 아니면 핫초코로 하시겠어요?",
            options: [
              { text: "Un café,\ns'il vous plaît.", correct: true,
                meaning: "커피 하나 부탁해요.",
                feedback: "커피가 바로 나온다. 따뜻한 카페와 뷔페로 든든한 아침! ☕🍳" },
              { text: "Un verre de vin\nrouge, s'il vous plaît.", correct: false,
                feedback: "아침 7시에 레드와인을? 직원이 말없이 물 한 잔을 가져온다. 🍷😶" },
              { text: "Je voudrais\nle plat du jour.", correct: false,
                feedback: "카페/테/쇼콜라 중에 고르라고 했는데 오늘의 특선을? 직원이 다시 설명해준다. 😅" },
              { text: "Non, merci.", correct: false,
                feedback: "'아니요, 괜찮아요'라고 했다. 음료 없이 식사하게 됐다. 목이 마르다. 😑" }
            ],
            hpChange: { success: 23, fail: -12 }
          }
        ]
      },
      {
        location: "Boulangerie Espuno", emoji: "🏃",
        intro: "오전 8시 30분. 오늘은 바쁜 날! 쿠르 살레야의 빵집에서 테이크아웃.",
        interactions: [
          {
            setup: "빵집에 들어서자 직원이 바로 묻는다. 테이크아웃임을 말하자.",
            npcName: "Vendeur", npcFrench: '"Bonjour ! Pour consommer ici ou à emporter ?"',
            npcMeaning: "안녕하세요! 여기서 드실 건가요, 포장이세요?",
            options: [
              { text: "À emporter,\ns'il vous plaît.", correct: true,
                meaning: "포장해 주세요.",
                feedback: "직원이 테이크아웃 봉투를 꺼낸다. 빠른 서비스, 완벽한 선택! 🥖🏃" },
              { text: "Pour consommer ici,\ns'il vous plaît.", correct: false,
                feedback: "'여기서 먹을게요'라고 했다. 앉아서 먹게 됐는데 이미 늦었다. 지각! ⏰" },
              { text: "Bonsoir !\nUne table pour deux.", correct: false,
                feedback: "저녁 인사에 2인 테이블? 직원이 고개를 갸웃거린다. 😕" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "테이크아웃 빵집에서 자고 싶다고? 직원이 멍하니 쳐다본다. 😴" }
            ],
            hpChange: { success: 5, fail: -10 }
          },
          {
            setup: "주문을 받겠다는 눈빛을 보낸다.",
            npcName: "Vendeur", npcFrench: '"Qu\'est-ce que vous prenez ?"',
            npcMeaning: "무엇으로 하시겠어요?",
            options: [
              { text: "Un café et\nune part de pissaladière,\ns'il vous plaît.", correct: true,
                meaning: "커피 하나와 피살라디에르(양파·안초비·올리브 타르트) 한 조각 부탁해요.",
                feedback: "피살라디에르 한 조각과 커피! 양파와 안초비, 검은 올리브의 짭짤한 니스 빵. 길거리에서 한입! 🥧☕✨" },
              { text: "Le plat du jour,\ns'il vous plaît.", correct: false,
                feedback: "테이크아웃 빵집에서 오늘의 특선을? 직원이 메뉴판을 가리킨다. '없어요'. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 했는데 계산서부터! 당황한 직원이 다시 묻는다. 😵" },
              { text: "Deux cafés\net un croissant.", correct: false,
                feedback: "혼자인데 커피 두 잔? 한 잔은 버려야 했다. 낭비! ☕☕" }
            ],
            hpChange: { success: 23, fail: -15 }
          }
        ]
      }
    ],

    /* ═══════════════════════════════
       🌞  DÉJEUNER  (5 scenarios)
    ═══════════════════════════════ */
    lunch: [
      {
        location: "Chez Pipo", emoji: "🥞",
        intro: "점심시간. 1923년부터 소카로 유명한 셰 피포. 니수아들 사이에 끼어 줄을 서자.",
        interactions: [
          {
            setup: "가게가 꽤 바쁘다. 웨이터가 다른 테이블을 서빙하며 당신 옆을 지나치려 한다.",
            npcName: "Situation", npcFrench: "(Le serveur passe rapidement à côté de vous)",
            npcMeaning: "(웨이터가 빠르게 옆을 지나친다)",
            options: [
              { text: "Excusez-moi,\nMonsieur !", correct: true,
                meaning: "실례합니다!",
                feedback: "웨이터가 돌아보며 반갑게 응한다. 화덕 옆 자리로 안내해 준다! 👍" },
              { text: "Garçon !\nGarçon !", correct: false,
                feedback: "'가르송'은 현대 프랑스에서 실례가 되는 표현. 웨이터가 못 들은 척 지나간다. 😤" },
              { text: "Bonjour... ?", correct: false,
                feedback: "너무 작은 목소리. 웨이터가 듣지 못하고 사라졌다. 🫥" },
              { text: "Hey ! Hey you !", correct: false,
                feedback: "영어로 소리쳤다. 웨이터가 차가운 눈빛을 보내며 못 본 척한다. 😶‍🌫️" }
            ],
            hpChange: { success: 5, fail: -10 }
          },
          {
            setup: "웨이터가 주문을 받으러 왔다. 셰 피포의 명물 소카(병아리콩 팬케이크)로 결정.",
            npcName: "Serveur", npcFrench: '"Vous avez choisi ?"',
            npcMeaning: "주문 결정하셨나요?",
            options: [
              { text: "Une socca et\nun verre de rosé,\ns'il vous plaît.", correct: true,
                meaning: "소카(병아리콩 팬케이크)와 로제 한 잔 부탁해요.",
                feedback: "갓 구운 소카와 시원한 로제! 셰 피포의 명물, 1923년부터 이어진 맛. 🥞🍷✨" },
              { text: "Je voudrais\nle petit-déjeuner.", correct: false,
                feedback: "점심에 아침 식사를? 웨이터가 난처한 표정을 짓는다. 🌅" },
              { text: "Un croissant,\ns'il vous plaît.", correct: false,
                feedback: "소카 가게에서 크루아상만? 웨이터가 고개를 갸웃거린다. 🥐" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 했는데 계산서를! 웨이터가 황당해한다. 😵" }
            ],
            hpChange: { success: 25, fail: -15 }
          },
          {
            setup: "맛있게 식사를 마쳤다. 계산할 차례. 웨이터와 눈이 마주쳤다.",
            npcName: "Situation", npcFrench: "(Le serveur passe près de votre table)",
            npcMeaning: "(웨이터가 테이블 근처를 지나간다)",
            options: [
              { text: "L'addition,\ns'il vous plaît !", correct: true,
                meaning: "계산서 부탁해요!",
                feedback: "웨이터가 영수증을 가져온다. 깔끔하게 식사 마무리! 💳" },
              { text: "La carte,\ns'il vous plaît.", correct: false,
                feedback: "식사 후에 메뉴판을? 웨이터가 의아해하며 가져온다. 😅" },
              { text: "Encore une fois,\ns'il vous plaît.", correct: false,
                feedback: "'한 번 더'라고 했다. 소카가 또 나왔다. 배가 터진다. 💸" },
              { text: "Merci, au revoir !", correct: false,
                feedback: "돈도 안 내고 나가려다 웨이터에게 제지당했다. 😱" }
            ],
            hpChange: { success: 5, fail: -15 }
          }
        ]
      },
      {
        location: "Lou Pilha Leva", emoji: "🥪",
        intro: "점심시간. 비외 니스의 'Lou Pilha Leva'(니수아 방언으로 '집어서 가져가기'). 다양한 니스 특산을 판다.",
        interactions: [
          {
            setup: "야외 카운터에 섰다. 서버가 반갑게 인사하며 주문을 기다린다.",
            npcName: "Serveur", npcFrench: '"Bonjour ! Qu\'est-ce que vous souhaitez ?"',
            npcMeaning: "안녕하세요! 무엇을 원하시나요?",
            options: [
              { text: "Bonjour !\nUn pan bagnat,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 팡 바냐(참치·안초비·토마토·올리브 샌드위치) 부탁해요.",
                feedback: "두꺼운 빵 안에 참치, 토마토, 안초비, 올리브가 가득한 팡 바냐! 니스 점심의 챔피언. 🥪✨" },
              { text: "Bonjour !\nUne crêpe sucrée,\ns'il vous plaît.", correct: false,
                feedback: "단 크레프를 주문했다. 식사용이 아닌 디저트라 배가 충분히 안 찼다. 🍓" },
              { text: "Le plat du jour,\ns'il vous plaît.", correct: false,
                feedback: "Lou Pilha Leva에서 오늘의 특선을? 여기선 다 특선이야. 서버가 웃으며 메뉴를 가리킨다. 😄" },
              { text: "Bonsoir !\nDeux pan bagnats,\ns'il vous plaît.", correct: false,
                feedback: "저녁 인사에 2인분? 혼자인데 팡 바냐가 두 개 나왔다. 😅" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "주문을 마치자 서버가 음료를 물어본다.",
            npcName: "Serveur", npcFrench: '"Et comme boisson ?"',
            npcMeaning: "음료는 어떻게 하시겠어요?",
            options: [
              { text: "Un verre de rosé\nde Provence, s'il vous plaît.", correct: true,
                meaning: "프로방스 로제 한 잔 부탁해요.",
                feedback: "팡 바냐에 프로방스 로제! 환상의 조합. 서버가 엄지를 든다. 🥪🍷" },
              { text: "Un café au lait,\ns'il vous plaît.", correct: false,
                feedback: "카페오레를 주문했다. 팡 바냐에 카페오레는 좀 어색하지만... 그래도 괜찮다. ☕" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "아직 음식도 안 나왔는데 계산서를? 서버가 멈추며 다시 묻는다. 😵" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "음료 대신 자고 싶다고? 서버가 정중하게 물 한 잔을 두고 간다. 😴" }
            ],
            hpChange: { success: 23, fail: -12 }
          }
        ]
      },
      {
        location: "René Socca", emoji: "🥧",
        intro: "점심, 빠른 한 끼. 비외 니스의 'René Socca'에서 한 접시 골라 먹기.",
        interactions: [
          {
            setup: "카운터 앞에 섰다. 쇼케이스에 니스 특산이 가득하다.",
            npcName: "Vendeur", npcFrench: '"Bonjour ! Pour vous ?"',
            npcMeaning: "안녕하세요! 무엇으로 드릴까요?",
            options: [
              { text: "Bonjour !\nUne part de pissaladière,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 피살라디에르(양파·안초비·올리브 타르트) 한 조각 부탁해요.",
                feedback: "피살라디에르 한 조각! 천천히 졸인 양파, 안초비, 검은 올리브의 환상 콤보. 🥧✨" },
              { text: "Bonjour !\nUn croissant,\ns'il vous plaît.", correct: false,
                feedback: "니스 특산점에서 크루아상을? 직원이 '저희는 니스 음식만요'라고 한다. 🥐" },
              { text: "Je voudrais\nle plat du jour.", correct: false,
                feedback: "카운터에서 오늘의 특선을? 직원이 당황하며 메뉴판을 가리킨다. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 하고 계산서부터! 직원이 어리둥절해한다. 😵" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "피살라디에르를 받았다. 계산하고 인사를 하자.",
            npcName: "Vendeur", npcFrench: '"Voilà ! Ça fait cinq euros."',
            npcMeaning: "여기 있어요! 5유로입니다.",
            options: [
              { text: "(돈을 내며)\nMerci, bonne journée !", correct: true,
                meaning: "감사합니다, 좋은 하루 보내세요!",
                feedback: "'봉 주르네!' 직원도 밝게 웃으며 인사해 준다. 피살라디에르를 들고 비외 니스 골목으로! 🌊☀️" },
              { text: "C'est combien ?", correct: false,
                feedback: "방금 5유로라고 했는데 또 얼마냐고? 직원이 한숨을 쉰다. 😮‍💨" },
              { text: "Non, merci.", correct: false,
                feedback: "안 사겠다고? 직원이 다시 케이스에 넣는다. 굶었다. 😭" },
              { text: "Encore une fois,\ns'il vous plaît.", correct: false,
                feedback: "'한 번 더'라고 했더니 피살라디에르가 두 조각이 됐다. 10유로를 내야 했다. 💸" }
            ],
            hpChange: { success: 23, fail: -12 }
          }
        ]
      },
      {
        location: "Restaurant Olive et Artichaut", emoji: "📋",
        intro: "오늘은 조금 특별한 점심. 비외 니스의 모던 니수아즈 식당, 미리 예약을 해뒀다.",
        interactions: [
          {
            setup: "쾌적한 식당 입구. 직원이 반갑게 맞이한다.",
            npcName: "Maître d'hôtel", npcFrench: '"Bonjour ! Vous avez une réservation ?"',
            npcMeaning: "안녕하세요! 예약하셨나요?",
            options: [
              { text: "Oui, bonjour !\nAu nom de Kim.", correct: true,
                meaning: "네, 안녕하세요! 김 이름으로 예약했어요.",
                feedback: "직원이 예약 명단에서 이름을 찾아 가장 좋은 자리로 안내해 준다. 🌟" },
              { text: "Non,\nsans réservation.", correct: false,
                feedback: "예약을 해놨는데 없다고 했다. 한참 혼란이 생긴 후에야 자리에 앉았다. 😰" },
              { text: "Bonsoir !\nUne table pour deux.", correct: false,
                feedback: "점심에 저녁 인사, 2인 테이블? 직원이 예약 명단과 대조하며 혼란스러워한다. 😅" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "식당 입구에서 자고 싶다고? 직원이 정중하게 돌아서라고 한다. 😶" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "웨이터가 오늘의 점심 코스를 설명하며 묻는다.",
            npcName: "Serveur", npcFrench: '"Vous souhaitez le menu ou à la carte ?"',
            npcMeaning: "코스 메뉴로 하시겠어요, 아니면 단품으로?",
            options: [
              { text: "Le menu,\ns'il vous plaît.", correct: true,
                meaning: "코스 메뉴로 부탁해요.",
                feedback: "코스 메뉴 선택! 투르트 드 블레트 → 페티 파르시 → 망통 레몬 타르트. 훌륭한 니스 점심! 🍽️✨" },
              { text: "À la carte,\ns'il vous plaît.", correct: false,
                feedback: "단품 주문을 선택했다. 비쌌지만 먹고 싶었던 요리만 먹었다. 💸" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "메뉴를 고르기도 전에 계산서를! 웨이터가 당황해한다. 😵" },
              { text: "Un pain au chocolat,\ns'il vous plaît.", correct: false,
                feedback: "고급 레스토랑에서 팽 오 쇼콜라를? 웨이터가 말없이 메뉴판을 다시 건넨다. 😐" }
            ],
            hpChange: { success: 25, fail: -12 }
          }
        ]
      },
      {
        location: "Le Safari", emoji: "🌞",
        intro: "점심. 쿠르 살레야의 인기 카페 Le Safari. 시장 풍경을 보며 가볍게 한 접시.",
        interactions: [
          {
            setup: "자리에 앉자 웨이터가 주문을 받으러 왔다.",
            npcName: "Serveur", npcFrench: '"Bonjour ! Vous désirez ?"',
            npcMeaning: "안녕하세요! 무엇을 드릴까요?",
            options: [
              { text: "Bonjour !\nUne salade niçoise,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 살라드 니수아즈 부탁해요.",
                feedback: "정통 살라드 니수아즈! 참치, 안초비, 토마토, 올리브, 삶은 달걀. 햇빛 가득한 니스 점심. 🥗☀️" },
              { text: "Bonsoir !\nUn steak frites,\ns'il vous plaît.", correct: false,
                feedback: "점심에 저녁 인사에 스테이크를? 웨이터가 어색하게 웃으며 메뉴판을 다시 준다. 🥩" },
              { text: "Le plat du jour,\ns'il vous plaît.", correct: false,
                feedback: "오늘의 특선을 주문했다. 나쁘진 않지만 살라드 니수아즈가 더 먹고 싶었다. 😑" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 했는데 계산서부터! 웨이터가 멈추며 다시 묻는다. 😵" }
            ],
            hpChange: { success: 5, fail: -10 }
          },
          {
            setup: "음식이 나왔다. 목이 마른데 물을 부탁하고 싶다.",
            npcName: "Situation", npcFrench: "(웨이터가 옆을 지나간다)",
            npcMeaning: "(웨이터가 옆을 지나간다)",
            options: [
              { text: "Excusez-moi !\nUn verre d'eau,\ns'il vous plaît.", correct: true,
                meaning: "실례합니다! 물 한 잔 부탁해요.",
                feedback: "물 한 잔을 부탁했다. 웨이터가 바로 탄산 없는 물을 가져온다. 프랑스에선 무료! 💧" },
              { text: "Excusez-moi !\nL'addition,\ns'il vous plaît.", correct: false,
                feedback: "물 대신 계산서를 달라고 했다. 아직 다 먹지도 않았는데... 목마른 채로 계산했다. 😅" },
              { text: "Merci !", correct: false,
                feedback: "감사하다고만 했다. 웨이터가 고개를 끄덕이고 지나쳐 버렸다. 목이 마르다. 😑" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "자고 싶다고? 웨이터가 조용히 물 한 잔을 가져다준다. 그게 최선인 것 같았나 보다. 😴" }
            ],
            hpChange: { success: 20, fail: -12 }
          }
        ]
      }
    ],

    /* ═══════════════════════════════
       🌤️  GOÛTER  (5 scenarios)
    ═══════════════════════════════ */
    snack: [
      {
        location: "Boulangerie Veziano", emoji: "🥖",
        intro: "오후 4시. 달콤한 간식 시간. 비외 니스의 베지아노. 빵 굽는 향기가 가득하다.",
        interactions: [
          {
            setup: "빵집 문을 열고 들어섰다. 주인 아주머니가 고개를 든다.",
            npcName: "Patronne", npcFrench: '"Bonjour, Monsieur/Madame !"',
            npcMeaning: "안녕하세요!",
            options: [
              { text: "Bonjour !\nUne fougassette,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 푸가세트(오렌지꽃 향 니스 빵) 부탁해요.",
                feedback: "인사와 주문 모두 완벽! 오렌지꽃 향 가득한 푸가세트, 부드럽고 달콤하다. 🥐✨" },
              { text: "Bonsoir !\nUn croissant,\ns'il vous plaît.", correct: false,
                feedback: "오후 4시에 저녁 인사에 크루아상? 아주머니가 어색하게 웃으며 크루아상을 준다. 😅" },
              { text: "Bonjour !\nUn café au lait,\ns'il vous plaît.", correct: false,
                feedback: "빵집에서 카페오레를? 아주머니가 '저희는 빵만 팔아요'라고 한다. ☕" },
              { text: "Une fougassette,\nmerci !", correct: false,
                feedback: "인사 없이 바로 주문. 아주머니가 살짝 당황하지만 빵을 준다. 분위기가 싸늘하다. 🥶" }
            ],
            hpChange: { success: 5, fail: -5 }
          },
          {
            setup: "아주머니가 푸가세트를 봉투에 담아 건네며 말한다.",
            npcName: "Patronne", npcFrench: '"Ça fait deux euros, s\'il vous plaît."',
            npcMeaning: "2유로입니다.",
            options: [
              { text: "(돈을 건네며)\nVoilà ! Merci beaucoup,\nMadame !", correct: true,
                meaning: "여기 있어요! 감사합니다, 아주머니!",
                feedback: "'여기 있어요! 감사합니다, 아주머니!' 아주머니가 밝게 웃으며 인사해 준다. 💛" },
              { text: "C'est combien ?", correct: false,
                feedback: "방금 2유로라고 했는데 또 얼마냐고? 아주머니가 한숨을 쉰다. 😮‍💨" },
              { text: "Non, merci.", correct: false,
                feedback: "'아니요, 괜찮아요'. 아주머니가 빵을 다시 가져간다. 간식 없음! 😭" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "빵집에서 '라디씨옹'을? 아주머니가 어이없어하지만 받아준다. 😅" }
            ],
            hpChange: { success: 20, fail: -10 }
          }
        ]
      },
      {
        location: "Fenocchio — Glacier", emoji: "🍦",
        intro: "오후 3시. 플라스 로제티의 전설적인 아이스크림 가게. 95가지 맛, 줄이 길다!",
        interactions: [
          {
            setup: "드디어 차례가 됐다. 직원이 스쿱 수를 물어본다.",
            npcName: "Serveur", npcFrench: '"Bonjour ! Combien de boules ?"',
            npcMeaning: "안녕하세요! 몇 스쿱 드릴까요?",
            options: [
              { text: "Bonjour !\nDeux boules,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 두 스쿱 부탁해요.",
                feedback: "'부울' 두 스쿱! 직원이 콘을 준비한다. 거의 다 왔다. 🍦" },
              { text: "Bonjour !\nTrois boules,\ns'il vous plaît.", correct: false,
                feedback: "세 스쿱을 주문했다. 좀 많지만... 더운 날씨에 녹기 전에 서둘러야 했다. 🍦🍦🍦" },
              { text: "Bonsoir !\nUn café,\ns'il vous plaît.", correct: false,
                feedback: "오후에 저녁 인사에 커피를? 직원이 '저희는 아이스크림만요'라고 한다. ☕" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "아이스크림 가게에서 자고 싶다고? 직원이 황당해한다. 줄 서던 사람들이 웅성거린다. 😴" }
            ],
            hpChange: { success: 5, fail: -5 }
          },
          {
            setup: "스쿱 수를 말했다. 이제 맛을 골라야 한다.",
            npcName: "Serveur", npcFrench: '"Quel parfum ?"',
            npcMeaning: "어떤 맛으로 드릴까요?",
            options: [
              { text: "Citron de Menton\net basilic,\ns'il vous plaît.", correct: true,
                meaning: "망통 레몬과 바질로 부탁해요.",
                feedback: "망통 레몬과 바질! Fenocchio의 시그니처 95가지 맛 중 가장 니스다운 조합. 코트다쥐르의 맛. 🍦☀️" },
              { text: "Un café au lait,\ns'il vous plaît.", correct: false,
                feedback: "아이스크림 가게에서 카페오레를? 직원이 재차 맛을 물어본다. ☕" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "맛 선택도 안 하고 계산서를! 직원이 멍하니 쳐다본다. 😵" },
              { text: "Je ne sais pas.", correct: false,
                feedback: "'모르겠어요'라고 했다. 직원이 기다리고 있다. 다음 손님이 눈치를 준다. 결국 아무 맛이나 받았다. 😅" }
            ],
            hpChange: { success: 20, fail: -8 }
          }
        ]
      },
      {
        location: "Pâtisserie LAC", emoji: "🍵",
        intro: "오후 4시. 마이트르 쇼콜라티에 패트릭 라크의 살롱. 망통 레몬 타르트가 유명하다.",
        interactions: [
          {
            setup: "우아한 살롱에 들어섰다. 직원이 인원수를 물어본다.",
            npcName: "Hôtesse", npcFrench: '"Bonjour ! Pour combien de personnes ?"',
            npcMeaning: "안녕하세요! 몇 분이세요?",
            options: [
              { text: "Pour une personne,\ns'il vous plaît.", correct: true,
                meaning: "1인 자리 부탁해요.",
                feedback: "혼자 왔다고 했더니 아늑한 1인석으로 안내해 준다. 우아한 오후! 🌸" },
              { text: "Pour deux personnes,\ns'il vous plaît.", correct: false,
                feedback: "2인 자리로 안내받았다. 혼자인데 빈 자리가 생겼다. 좀 외로운 오후. 😶" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "아직 앉지도 않았는데 계산서를! 직원이 황당해한다. 🤦" },
              { text: "Bonsoir !\nDeux personnes.", correct: false,
                feedback: "오후 4시에 저녁 인사에 2인? 직원이 어색하게 웃으며 자리를 안내한다. 😅" }
            ],
            hpChange: { success: 5, fail: -5 }
          },
          {
            setup: "자리에 앉자 웨이터가 주문을 받으러 왔다.",
            npcName: "Serveur", npcFrench: '"Qu\'est-ce que vous prenez ?"',
            npcMeaning: "무엇으로 하시겠어요?",
            options: [
              { text: "Un thé et\nune tarte au citron\nde Menton, s'il vous plaît.", correct: true,
                meaning: "차 하나와 망통 레몬 타르트 부탁해요.",
                feedback: "홍차와 망통 레몬 타르트! 코트다쥐르 디저트의 정수. 레몬의 산미가 입안에 가득. 🍋✨" },
              { text: "Un café et\nun croissant,\ns'il vous plaît.", correct: false,
                feedback: "카페와 크루아상을 주문했다. 나쁘지 않지만 망통 레몬 타르트가 눈에 밟힌다. ☕🥐" },
              { text: "Un steak frites,\ns'il vous plaît.", correct: false,
                feedback: "살롱 드 테에서 스테이크 프리트를? 웨이터가 조용히 메뉴판을 다시 건넨다. 😐" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "우아한 살롱에서 자고 싶다고? 웨이터가 '혹시 피로하신가요?'라고 묻는다. 😴" }
            ],
            hpChange: { success: 20, fail: -10 }
          }
        ]
      },
      {
        location: "Marché aux Fleurs Cours Saleya", emoji: "🛒",
        intro: "오후 4시 30분. 쿠르 살레야의 야외 시장. 신선한 과일을 사보자.",
        interactions: [
          {
            setup: "무화과 가판대 앞에 섰다. 상인 아저씨가 반갑게 인사한다.",
            npcName: "Marchand", npcFrench: '"Bonjour ! Vous désirez ?"',
            npcMeaning: "안녕하세요! 무엇을 원하세요?",
            options: [
              { text: "Bonjour !\nC'est combien,\nles figues ?", correct: true,
                meaning: "안녕하세요! 무화과 얼마예요?",
                feedback: "'무화과 얼마예요?' 상인이 '킬로당 6유로요!'라고 밝게 대답한다. 🍇" },
              { text: "Bonsoir !\nJe voudrais\ndes pommes.", correct: false,
                feedback: "저녁 인사에 사과를? 무화과 가판대에서. 상인이 사과는 저쪽에 있다고 알려준다. 🍎" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "시장에서 계산서를? 상인이 어이없어하며 웃는다. 😂" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "시장 한가운데서 자고 싶다고? 상인이 걱정스러운 눈빛을 보낸다. 😴" }
            ],
            hpChange: { success: 5, fail: -5 }
          },
          {
            setup: "상인이 킬로당 가격을 알려줬다.",
            npcName: "Marchand", npcFrench: '"Six euros le kilo !"',
            npcMeaning: "킬로당 6유로예요!",
            options: [
              { text: "Un kilo,\ns'il vous plaît.", correct: true,
                meaning: "1킬로 부탁해요.",
                feedback: "1킬로 주문! 상인이 잘 익은 무화과를 봉투에 담아준다. 간식으로 완벽. 🍇✨" },
              { text: "Deux kilos,\ns'il vous plaît.", correct: false,
                feedback: "2킬로는 너무 많다. 혼자 다 먹기 힘들다. 12유로를 냈다. 💸" },
              { text: "Non, merci.", correct: false,
                feedback: "'아니요'라고 했다. 상인이 씩 웃으며 '다음에 또 오세요!'라고 한다. 간식 없음. 😑" },
              { text: "C'est combien ?", correct: false,
                feedback: "방금 킬로당 6유로라고 했는데 또 얼마냐고? 상인이 다시 한번 설명해 준다. 😮‍💨" }
            ],
            hpChange: { success: 20, fail: -8 }
          }
        ]
      },
      {
        location: "Maison Auer", emoji: "🍫",
        intro: "오후 3시 30분. 1820년부터 이어진 전설의 confiserie. 과일 콩피로 유명하다.",
        interactions: [
          {
            setup: "고풍스러운 가게 카운터 앞에 섰다. 직원이 눈을 마주치며 말한다.",
            npcName: "Vendeuse", npcFrench: '"Bonjour ! Je vous écoute."',
            npcMeaning: "안녕하세요! 말씀하세요.",
            options: [
              { text: "Bonjour !\nUn assortiment de\nfruits confits, s'il vous plaît.", correct: true,
                meaning: "안녕하세요! 과일 콩피(설탕에 절인 과일) 모듬 부탁해요.",
                feedback: "1820년부터 이어진 메종 오에르의 명물 fruits confits! 살구, 무화과, 멜론까지. 🍑✨" },
              { text: "Bonsoir !\nUn croissant,\ns'il vous plaît.", correct: false,
                feedback: "오후에 저녁 인사에 크루아상을? 직원이 어색하게 웃으며 '저희는 confiserie예요'라고 한다. 🥐" },
              { text: "Je voudrais\nle plat du jour.", correct: false,
                feedback: "콩피즈리에서 오늘의 특선을? '저희는 과일 콩피와 초콜릿만 팔아요'라는 대답이 돌아온다. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 하고 계산서를! 직원이 당황해한다. 😵" }
            ],
            hpChange: { success: 5, fail: -5 }
          },
          {
            setup: "과일 콩피를 포장해 준다. 직원이 묻는다.",
            npcName: "Vendeuse", npcFrench: '"C\'est tout ?"',
            npcMeaning: "이게 전부인가요?",
            options: [
              { text: "Oui,\nc'est pour offrir.", correct: true,
                meaning: "네, 선물용이에요.",
                feedback: "'네, 선물용이에요.' 직원이 예쁜 리본 상자에 담아준다. 완벽한 니스 기념품! 🎁🍫" },
              { text: "Oui,\nc'est pour manger ici.", correct: false,
                feedback: "'여기서 먹을게요.' 직원이 작은 접시에 담아준다. 카운터에 서서 먹게 됐다. 나쁘진 않다. 🍽️" },
              { text: "Non,\nencore une fois.", correct: false,
                feedback: "'한 번 더'라고 했다. 과일 콩피가 두 박스가 됐다. 지갑이 얇아진다. 💸🍫" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "'이게 전부냐'는 질문에 계산서를? 직원이 멈추며 다시 묻는다. 😅" }
            ],
            hpChange: { success: 20, fail: -8 }
          }
        ]
      }
    ],

    /* ═══════════════════════════════
       🌙  DÎNER  (5 scenarios)
    ═══════════════════════════════ */
    dinner: [
      {
        location: "L'Acchiardo", emoji: "🍷",
        intro: "저녁 7시 30분. 노을이 진다. 비외 니스의 전설적인 가족 식당 L'Acchiardo. 1927년부터 이어진 곳.",
        interactions: [
          {
            setup: "식당 문을 열었다. 가족 매니저가 반갑게 맞이한다.",
            npcName: "Maître d'hôtel", npcFrench: '"Bonsoir ! Vous avez une réservation ?"',
            npcMeaning: "안녕하세요! 예약하셨나요?",
            options: [
              { text: "Bonsoir !\nNon, sans réservation.", correct: true,
                meaning: "안녕하세요! 아니요, 예약 없이 왔어요.",
                feedback: "저녁 인사와 예약 없음을 자연스럽게 전달! 매니저가 빈 테이블로 안내한다. 🌙✨" },
              { text: "Bonjour !\nOui, une réservation.", correct: false,
                feedback: "저녁에 Bonjour에 예약이 있다고? 매니저가 명단을 뒤지다가 혼란에 빠진다. 😰" },
              { text: "Bonsoir !\nUne table pour une personne,\ns'il vous plaît.", correct: false,
                feedback: "저녁 인사는 맞았지만 예약 질문에 답하지 않았다. 그래도 자리를 안내받는다. 😅" },
              { text: "Bonjour !\nJe voudrais dormir.", correct: false,
                feedback: "저녁에 아침 인사에 '자고 싶다'까지. 매니저가 당황해하며 돌아선다. 😶" }
            ],
            hpChange: { success: 5, fail: -10 }
          },
          {
            setup: "메뉴를 보다 도브 니수아즈(니스식 소고기 스튜)로 결정했다. 웨이터가 왔다.",
            npcName: "Serveur", npcFrench: '"Qu\'est-ce que vous prenez ?"',
            npcMeaning: "무엇으로 하시겠어요?",
            options: [
              { text: "Je voudrais\nla daube niçoise,\ns'il vous plaît.", correct: true,
                meaning: "도브 니수아즈(니스식 소고기 스튜) 부탁해요.",
                feedback: "푹 끓인 도브 니수아즈와 폴렌타! 며칠 동안 조리한 깊은 맛. 오늘의 하이라이트! 🥩🍷" },
              { text: "Un croissant et\nun café,\ns'il vous plaît.", correct: false,
                feedback: "저녁에 크루아상과 커피? 웨이터가 살짝 당황하지만 가져온다. 저녁이 허전하다. 🥐" },
              { text: "Je voudrais\nle petit-déjeuner.", correct: false,
                feedback: "저녁에 아침 식사를 주문했다. '저녁 메뉴만 있어요'라는 대답이 돌아온다. ⏰" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 하고 계산서부터! 웨이터가 말없이 돌아선다. 굶은 저녁. 😵‍💫" }
            ],
            hpChange: { success: 25, fail: -15 }
          },
          {
            setup: "맛있는 저녁을 즐겼다. 웨이터가 빈 접시를 치우러 왔다.",
            npcName: "Serveur", npcFrench: '"C\'était bon ?"',
            npcMeaning: "맛있었나요?",
            options: [
              { text: "Oui,\nc'était délicieux !\nMerci beaucoup.", correct: true,
                meaning: "네, 정말 맛있었어요! 대단히 감사합니다.",
                feedback: "'네, 정말 맛있었어요! 감사합니다.' 웨이터가 환하게 웃는다. 완벽한 하루의 마무리! 🌟" },
              { text: "Non,\nc'était terrible.", correct: false,
                feedback: "'끔찍했어요.' 웨이터의 표정이 굳는다. 팁은 물 건너갔다. 😬" },
              { text: "Oui,\nje voudrais dormir.", correct: false,
                feedback: "맛있었다고 하고 자고 싶다고? 웨이터가 어리둥절해한다. 😴" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "'맛있었냐'는 질문에 계산서를? 웨이터가 살짝 상처받지만 가져온다. 💸" }
            ],
            hpChange: { success: 5, fail: -5 }
          }
        ]
      },
      {
        location: "Le Bistrot d'Antoine", emoji: "🌿",
        intro: "저녁 7시. 비외 니스의 인기 비스트로 Antoine. 페티 파르시가 유명하다.",
        interactions: [
          {
            setup: "비스트로 문을 열었다. 저녁이라 꽤 붐빈다.",
            npcName: "Serveur", npcFrench: '"Bonsoir ! Vous avez réservé ?"',
            npcMeaning: "안녕하세요! 예약하셨나요?",
            options: [
              { text: "Bonsoir !\nNon, sans réservation.", correct: true,
                meaning: "안녕하세요! 아니요, 예약 없이 왔어요.",
                feedback: "저녁 인사와 예약 없음! 서버가 잠시 확인하더니 창가 자리로 안내한다. 🌙" },
              { text: "Bonjour !\nOui, j'ai réservé.", correct: false,
                feedback: "저녁에 '봉쥬르'에 예약이 있다고? 서버가 명단에서 이름을 찾지 못해 혼란이 생겼다. 😰" },
              { text: "Bonsoir !\nDeux personnes,\ns'il vous plaît.", correct: false,
                feedback: "저녁 인사는 맞았지만 예약 질문엔 답하지 않았다. 그래도 자리를 찾아준다. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "들어오자마자 계산서를! 서버가 황당해한다. 😵" }
            ],
            hpChange: { success: 5, fail: -10 }
          },
          {
            setup: "메뉴를 훑어보다 페티 파르시 니수아(니스식 속채운 야채)로 결정했다.",
            npcName: "Serveur", npcFrench: '"Qu\'est-ce que vous désirez comme plat ?"',
            npcMeaning: "어떤 요리로 하시겠어요?",
            options: [
              { text: "Je voudrais\nles petits farcis niçois,\ns'il vous plaît.", correct: true,
                meaning: "페티 파르시 니수아(속채운 토마토·호박·양파) 부탁해요.",
                feedback: "페티 파르시 완벽 주문! 토마토, 호박, 양파에 속을 가득 채운 니스 가정식의 정수. 🍅✨" },
              { text: "Un steak frites,\ns'il vous plaît.", correct: false,
                feedback: "니수아 비스트로에서 스테이크 프리트? 웨이터가 살짝 아쉬운 표정이다. 나쁘진 않다. 🥩" },
              { text: "Le petit-déjeuner,\ns'il vous plaît.", correct: false,
                feedback: "저녁에 아침 식사를? 웨이터가 정중하게 저녁 메뉴를 다시 설명한다. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 하고 계산서를! 오늘도 배고픈 저녁. 😵" }
            ],
            hpChange: { success: 25, fail: -15 }
          }
        ]
      },
      {
        location: "L'Escalinada", emoji: "🦪",
        intro: "저녁 8시. 비외 니스의 전통 식당 L'Escalinada. 니스 가정식과 해산물로 유명.",
        interactions: [
          {
            setup: "웨이터가 인원 수를 물어본다.",
            npcName: "Serveur", npcFrench: '"Bonsoir ! Vous êtes combien ?"',
            npcMeaning: "안녕하세요! 몇 분이세요?",
            options: [
              { text: "Bonsoir !\nJe suis seul(e),\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 혼자예요.",
                feedback: "'혼자예요.' 웨이터가 화기애애한 분위기의 작은 테이블로 안내한다. 혼밥의 낭만! 🪑🌙" },
              { text: "Bonsoir !\nDeux personnes,\ns'il vous plaît.", correct: false,
                feedback: "2인 자리로 안내됐다. 혼자 넓은 자리에 앉아서 좀 어색하다. 😅" },
              { text: "Bonjour !\nJe suis seul(e).", correct: false,
                feedback: "저녁에 '봉쥬르'를! 웨이터가 어색하게 웃으며 자리로 안내한다. 😶" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "들어오자마자 계산서를! 웨이터가 황당해한다. 😵" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "메뉴를 보다 피스투 홍합과 니스 자체 와인 벨레로 결정했다.",
            npcName: "Serveur", npcFrench: '"Vous avez choisi ?"',
            npcMeaning: "주문 결정하셨나요?",
            options: [
              { text: "Je voudrais des\nmoules au pistou et\nun verre de Bellet,\ns'il vous plaît.", correct: true,
                meaning: "피스투 홍합(바질 페스토 홍합)과 벨레 와인 한 잔 부탁해요.",
                feedback: "피스투 홍합과 벨레! 벨레는 니스 자체 AOC 와인. 향긋한 바질과 와인의 환상 조합. 🦪🍷✨" },
              { text: "Un croissant,\ns'il vous plaît.", correct: false,
                feedback: "저녁에 크루아상만? 웨이터가 살짝 걱정스러운 눈빛을 보내며 가져온다. 🥐" },
              { text: "Le petit-déjeuner,\ns'il vous plaît.", correct: false,
                feedback: "저녁에 아침 식사를? 웨이터가 저녁 메뉴로 안내한다. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "또 주문도 안 하고 계산서부터! 배고픈 저녁이 됐다. 😵‍💫" }
            ],
            hpChange: { success: 25, fail: -15 }
          }
        ]
      },
      {
        location: "Pizzeria Cresci", emoji: "🍕",
        intro: "저녁 7시 30분. 니스는 이탈리아 국경과 가까워 피자 문화도 깊다. 오늘은 명물 피체리아 크레시!",
        interactions: [
          {
            setup: "피체리아 문을 열었다. 반가운 인사를 건네는 직원.",
            npcName: "Serveur", npcFrench: '"Bonsoir ! Vous êtes combien ce soir ?"',
            npcMeaning: "안녕하세요! 오늘 저녁 몇 분이세요?",
            options: [
              { text: "Bonsoir !\nJe suis seul(e),\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 혼자예요.",
                feedback: "저녁 인사와 1인 확인! 화덕이 보이는 아늑한 자리로 안내받는다. 🍕🌙" },
              { text: "Bonjour !\nDeux personnes.", correct: false,
                feedback: "저녁에 아침 인사에 2인 자리? 직원이 어색하게 웃으며 자리로 안내한다. 😅" },
              { text: "Bonsoir !\nL'addition,\ns'il vous plaît.", correct: false,
                feedback: "들어오자마자 계산서를? 직원이 황당해한다. 😵" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "피체리아에서 자고 싶다고? 직원이 정중하게 '저희는 식당이에요'라고 한다. 😴" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "메뉴를 보다 피살라디에르(니스식 양파 피자)로 결정했다.",
            npcName: "Serveur", npcFrench: '"Qu\'est-ce que vous prenez ?"',
            npcMeaning: "무엇으로 하시겠어요?",
            options: [
              { text: "Une pissaladière\net un verre de rosé,\ns'il vous plaît.", correct: true,
                meaning: "피살라디에르(니스식 양파 피자)와 로제 한 잔 부탁해요.",
                feedback: "피살라디에르 + 로제! 천천히 졸인 양파, 안초비, 검은 올리브 가득. 니스의 피자. 🍕🍷" },
              { text: "Un steak frites,\ns'il vous plaît.", correct: false,
                feedback: "피체리아에서 스테이크 프리트? 직원이 잠시 고민하더니 '없어요'라고 한다. 🥩" },
              { text: "Le plat du jour,\ns'il vous plaît.", correct: false,
                feedback: "오늘의 특선을 주문했다. 파스타가 나왔다. 나쁘지 않지만 피자가 더 먹고 싶었다. 🍝" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 하고 계산서를! 직원이 멈추며 다시 묻는다. 배고픈 저녁. 😵" }
            ],
            hpChange: { success: 25, fail: -15 }
          }
        ]
      },
      {
        location: "La Petite Maison", emoji: "🥂",
        intro: "저녁 8시. 오늘은 특별한 날. 니스의 전설 La Petite Maison에서 저녁을.",
        interactions: [
          {
            setup: "고급스러운 레스토랑 문을 열었다. 소믈리에가 메뉴를 권한다.",
            npcName: "Serveur", npcFrench: '"Bonsoir ! Vous souhaitez voir la carte ?"',
            npcMeaning: "안녕하세요! 메뉴판 보시겠어요?",
            options: [
              { text: "Oui, bonsoir !\nLa carte,\ns'il vous plaît.", correct: true,
                meaning: "네, 안녕하세요! 메뉴판 부탁해요.",
                feedback: "웨이터가 두꺼운 메뉴판을 가져온다. 오늘 저녁은 특별하게 시작됐다. 🥂" },
              { text: "Non, merci.\nL'addition,\ns'il vous plaît.", correct: false,
                feedback: "메뉴도 안 보고 계산서를? 웨이터가 황당해하며 다시 묻는다. 😵" },
              { text: "Bonjour !\nOui, la carte.", correct: false,
                feedback: "저녁에 아침 인사를! 웨이터가 어색하게 웃으며 메뉴판을 건넨다. 😅" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "고급 레스토랑에서 자고 싶다고? 웨이터가 정중하게 다른 의자를 권한다. 😴" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "음식을 주문했다. 이번엔 니스 자체 와인 벨레를 곁들이고 싶다.",
            npcName: "Serveur", npcFrench: '"Et comme boisson ?"',
            npcMeaning: "음료는 어떻게 하시겠어요?",
            options: [
              { text: "Un verre de Bellet\nrouge, s'il vous plaît.", correct: true,
                meaning: "벨레 레드와인 한 잔 부탁해요.",
                feedback: "벨레 레드! 니스 카브에서 시작된 자체 AOC 와인. 소믈리에가 자랑스럽게 따라준다. 🍷✨" },
              { text: "Un café au lait,\ns'il vous plaît.", correct: false,
                feedback: "고급 레스토랑 저녁에 카페오레를? 웨이터가 살짝 당황하지만 가져온다. ☕" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "음료도 주문 안 하고 계산서를! 웨이터가 멈추며 다시 묻는다. 😵" },
              { text: "Je voudrais\nle petit-déjeuner.", correct: false,
                feedback: "저녁에 아침 식사를? 웨이터가 정중하게 저녁 메뉴로 안내한다. 😅" }
            ],
            hpChange: { success: 25, fail: -15 }
          }
        ]
      }
    ]
  }
};
