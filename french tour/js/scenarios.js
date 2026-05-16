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
        location: "Café du Marais", emoji: "☕",
        intro: "파리, 오전 7시 30분. 작은 카페에서 하루를 시작하자.",
        interactions: [
          {
            setup: "카페 문을 열고 들어섰다. 앞치마를 두른 웨이터가 다가온다.",
            npcName: "Serveur", npcFrench: '"Bonjour ! Bienvenue !"',
            npcMeaning: "안녕하세요! 어서 오세요!",
            options: [
              { text: "Bonjour !\nUne table pour une personne,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 1인 자리 부탁해요.",
                feedback: "웨이터가 미소를 지으며 창가 자리로 안내해 준다. 파리의 아침이 시작됐다! ✨" },
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
              { text: "Un croissant et\nun café au lait,\ns'il vous plaît.", correct: true,
                meaning: "크루아상 하나와 카페오레 부탁해요.",
                feedback: "완벽한 주문! 따뜻한 크루아상과 카페오레가 나왔다. 든든한 파리의 아침! 🥐☕" },
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
        location: "Boulangerie Jourdain", emoji: "🥖",
        intro: "오전 8시. 동네 빵집에서 간단하게 아침을 해결하기로 했다.",
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
        location: "Café Les Deux Magots", emoji: "🌿",
        intro: "오전 9시. 생제르맹 유명 카페. 햇살 좋은 테라스 자리를 노리자.",
        interactions: [
          {
            setup: "입구에서 웨이터가 자리를 안내하려 한다. 테라스 자리에 앉고 싶다.",
            npcName: "Serveur", npcFrench: '"Bonjour ! Vous avez une préférence ?"',
            npcMeaning: "안녕하세요! 자리 선호도가 있으신가요?",
            options: [
              { text: "Bonjour !\nEn terrasse,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 테라스 자리 부탁해요.",
                feedback: "Bien sûr ! 테라스 자리로 안내받았다. 생제르맹 거리가 한눈에 내려다보인다. ☀️" },
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
                feedback: "Excellent choix ! 토스트와 홍차가 나왔다. 테라스에서 마시는 파리의 아침. 🍵🥖" },
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
        location: "Hôtel Bonaparte", emoji: "🏨",
        intro: "오전 7시. 호텔 식당에서 조식 포함 패키지. 여유롭게 아침 식사.",
        interactions: [
          {
            setup: "호텔 식당 입구에서 직원이 묻는다. 숙박객임을 확인시켜 주자.",
            npcName: "Hôtesse", npcFrench: '"Bonjour ! Vous prenez le petit-déjeuner ?"',
            npcMeaning: "안녕하세요! 조식 드시러 오셨나요?",
            options: [
              { text: "Oui, bonjour !\nChambre 214,\ns'il vous plaît.", correct: true,
                meaning: "네, 안녕하세요! 214호입니다.",
                feedback: "직원이 명부를 확인하고 창가 테이블로 안내한다. 조식 뷔페가 풍성하다! 🍳" },
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
        location: "Café Vite Fait", emoji: "🏃",
        intro: "오전 8시 30분. 오늘은 바쁜 날! 커피를 들고 나가기로 했다.",
        interactions: [
          {
            setup: "카페에 들어서자 직원이 바로 묻는다. 테이크아웃임을 말하자.",
            npcName: "Barista", npcFrench: '"Bonjour ! Pour consommer ici ou à emporter ?"',
            npcMeaning: "안녕하세요! 여기서 드실 건가요, 포장이세요?",
            options: [
              { text: "À emporter,\ns'il vous plaît.", correct: true,
                meaning: "포장해 주세요.",
                feedback: "바리스타가 테이크아웃 컵을 꺼낸다. 빠른 서비스, 완벽한 선택! ☕🏃" },
              { text: "Pour consommer ici,\ns'il vous plaît.", correct: false,
                feedback: "'여기서 마실게요'라고 했다. 앉아서 마시게 됐는데 이미 늦었다. 지각! ⏰" },
              { text: "Bonsoir !\nUne table pour deux.", correct: false,
                feedback: "저녁 인사에 2인 테이블? 바리스타가 고개를 갸웃거린다. 😕" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "테이크아웃 카페에서 자고 싶다고? 바리스타가 멍하니 쳐다본다. 😴" }
            ],
            hpChange: { success: 5, fail: -10 }
          },
          {
            setup: "주문을 받겠다는 눈빛을 보낸다.",
            npcName: "Barista", npcFrench: '"Qu\'est-ce que vous prenez ?"',
            npcMeaning: "무엇으로 하시겠어요?",
            options: [
              { text: "Un café et\nun pain au chocolat,\ns'il vous plaît.", correct: true,
                meaning: "커피 하나와 팽 오 쇼콜라 부탁해요.",
                feedback: "테이크아웃 커피와 팽 오 쇼콜라! 걸어가면서 먹는 파리의 아침. 🥐☕✨" },
              { text: "Le plat du jour,\ns'il vous plaît.", correct: false,
                feedback: "테이크아웃 커피숍에서 오늘의 특선을? 바리스타가 메뉴판을 가리킨다. '없어요'. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 했는데 계산서부터! 당황한 바리스타가 다시 묻는다. 😵" },
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
        location: "Brasserie Saint-Germain", emoji: "🍽️",
        intro: "점심시간. 파리지앵들로 북적이는 브라스리. 자리를 잡아야 한다.",
        interactions: [
          {
            setup: "레스토랑이 꽤 바쁘다. 웨이터가 다른 테이블을 서빙하며 당신 옆을 지나치려 한다.",
            npcName: "Situation", npcFrench: "(Le serveur passe rapidement à côté de vous)",
            npcMeaning: "(웨이터가 빠르게 옆을 지나친다)",
            options: [
              { text: "Excusez-moi,\nMonsieur !", correct: true,
                meaning: "실례합니다!",
                feedback: "웨이터가 돌아보며 반갑게 응한다. 좋은 자리로 안내해 준다! 👍" },
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
            setup: "웨이터가 주문을 받으러 왔다. 오늘의 특선 요리(플라 뒤 주르)로 하기로 했다.",
            npcName: "Serveur", npcFrench: '"Vous avez choisi ?"',
            npcMeaning: "주문 결정하셨나요?",
            options: [
              { text: "Je voudrais\nle plat du jour,\ns'il vous plaît.", correct: true,
                meaning: "오늘의 특선으로 할게요.",
                feedback: "오늘의 특선 완벽 주문! 얼마 후 맛있어 보이는 음식이 나온다. 🍖✨" },
              { text: "Je voudrais\nle petit-déjeuner.", correct: false,
                feedback: "점심에 아침 식사를? 웨이터가 난처한 표정을 짓는다. 🌅" },
              { text: "Un croissant,\ns'il vous plaît.", correct: false,
                feedback: "레스토랑 점심에 크루아상만? 웨이터가 고개를 갸웃거린다. 🥐" },
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
                feedback: "'한 번 더'라고 했다. 음식이 또 나왔다. 배가 터진다. 💸" },
              { text: "Merci, au revoir !", correct: false,
                feedback: "돈도 안 내고 나가려다 웨이터에게 제지당했다. 😱" }
            ],
            hpChange: { success: 5, fail: -15 }
          }
        ]
      },
      {
        location: "Crêperie Bretonne", emoji: "🥞",
        intro: "점심시간. 브르타뉴 전통 크레프리. 갈레트 한 장으로 든든하게.",
        interactions: [
          {
            setup: "크레프리에 들어섰다. 서버가 반갑게 인사하며 주문을 기다린다.",
            npcName: "Serveur", npcFrench: '"Bonjour ! Qu\'est-ce que vous souhaitez ?"',
            npcMeaning: "안녕하세요! 무엇을 원하시나요?",
            options: [
              { text: "Bonjour !\nJe voudrais une galette\ncomplète, s'il vous plaît.", correct: true,
                meaning: "안녕하세요! 갈레트 콩플레트(햄·달걀·치즈) 하나 부탁해요.",
                feedback: "갈레트 콩플레트(햄+달걀+치즈)를 완벽하게 주문! 브르타뉴의 맛이 나온다. 🥞✨" },
              { text: "Bonjour !\nUne crêpe sucrée,\ns'il vous plaît.", correct: false,
                feedback: "단 크레프를 주문했다. 식사용이 아닌 디저트 크레프라 배가 충분히 안 찼다. 🍓" },
              { text: "Le plat du jour,\ns'il vous plaît.", correct: false,
                feedback: "크레프리에서 오늘의 특선을? 여기선 갈레트가 특선이야. 웨이터가 웃으며 설명해 준다. 😄" },
              { text: "Bonsoir !\nDeux galettes,\ns'il vous plaît.", correct: false,
                feedback: "저녁 인사에 2인분? 혼자인데 갈레트가 두 장 나왔다. 😅" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "주문을 마치자 웨이터가 음료를 물어본다.",
            npcName: "Serveur", npcFrench: '"Et comme boisson ?"',
            npcMeaning: "음료는 어떻게 하시겠어요?",
            options: [
              { text: "Un cidre brut,\ns'il vous plaît.", correct: true,
                meaning: "드라이 시드르(브르타뉴 사과주) 부탁해요.",
                feedback: "갈레트에 시드르(브르타뉴 사과주)! 완벽한 조합. 웨이터가 엄지를 든다. 🍺🥞" },
              { text: "Un café au lait,\ns'il vous plaît.", correct: false,
                feedback: "카페오레를 주문했다. 갈레트에 카페오레는 좀 어색하지만... 그래도 괜찮다. ☕" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "아직 음식도 안 나왔는데 계산서를? 웨이터가 멈추며 다시 묻는다. 😵" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "음료 대신 자고 싶다고? 웨이터가 정중하게 시드르를 두고 간다. 😴" }
            ],
            hpChange: { success: 23, fail: -12 }
          }
        ]
      },
      {
        location: "Boulangerie-Sandwicherie", emoji: "🥪",
        intro: "점심, 빠른 한 끼. 빵집에서 샌드위치를 사 먹기로 했다.",
        interactions: [
          {
            setup: "빵집 카운터 앞에 섰다. 쇼케이스에 샌드위치들이 가득하다.",
            npcName: "Vendeur", npcFrench: '"Bonjour ! Pour vous ?"',
            npcMeaning: "안녕하세요! 무엇으로 드릴까요?",
            options: [
              { text: "Bonjour !\nUn sandwich\njambon-beurre, s'il vous plaît.", correct: true,
                meaning: "안녕하세요! 잠봉 뵈르 샌드위치(햄·버터 바게트) 하나 부탁해요.",
                feedback: "정통 파리 샌드위치 '잠봉 뵈르'! 직원이 바게트를 꺼내 바로 만들어준다. 🥖✨" },
              { text: "Bonjour !\nUn croissant,\ns'il vous plaît.", correct: false,
                feedback: "샌드위치 대신 크루아상을 사먹게 됐다. 점심치고는 가볍다. 🥐" },
              { text: "Je voudrais\nle plat du jour.", correct: false,
                feedback: "샌드위치 가게에서 오늘의 특선을? 직원이 당황하며 '저희는 샌드위치만요'라고 한다. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 하고 계산서부터! 직원이 어리둥절해한다. 😵" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "샌드위치를 받았다. 계산하고 인사를 하자.",
            npcName: "Vendeur", npcFrench: '"Voilà ! Ça fait cinq euros."',
            npcMeaning: "여기 있어요! 5유로입니다.",
            options: [
              { text: "(돈을 내며)\nMerci, bonne journée !", correct: true,
                meaning: "감사합니다, 좋은 하루 보내세요!",
                feedback: "'봉 주르네!' 직원도 밝게 웃으며 인사해 준다. 샌드위치를 들고 센 강변으로! 🌊☀️" },
              { text: "C'est combien ?", correct: false,
                feedback: "방금 5유로라고 했는데 또 얼마냐고? 직원이 한숨을 쉰다. 😮‍💨" },
              { text: "Non, merci.", correct: false,
                feedback: "샌드위치를 안 사겠다고? 직원이 다시 케이스에 넣는다. 굶었다. 😭" },
              { text: "Encore une fois,\ns'il vous plaît.", correct: false,
                feedback: "'한 번 더'라고 했더니 샌드위치가 두 개가 됐다. 10유로를 내야 했다. 💸" }
            ],
            hpChange: { success: 23, fail: -12 }
          }
        ]
      },
      {
        location: "Restaurant Le Procope", emoji: "📋",
        intro: "오늘은 조금 특별한 레스토랑. 미리 예약을 해뒀다.",
        interactions: [
          {
            setup: "파리에서 가장 오래된 카페 레스토랑 입구. 직원이 반갑게 맞이한다.",
            npcName: "Maître d'hôtel", npcFrench: '"Bonjour ! Vous avez une réservation ?"',
            npcMeaning: "안녕하세요! 예약하셨나요?",
            options: [
              { text: "Oui, bonjour !\nAu nom de Kim.", correct: true,
                meaning: "네, 안녕하세요! 김 이름으로 예약했어요.",
                feedback: "직원이 예약 명단에서 이름을 찾아 최고의 자리로 안내해 준다. 🌟" },
              { text: "Non,\nsans réservation.", correct: false,
                feedback: "예약을 해놨는데 없다고 했다. 한참 혼란이 생긴 후에야 자리에 앉았다. 😰" },
              { text: "Bonsoir !\nUne table pour deux.", correct: false,
                feedback: "점심에 저녁 인사, 2인 테이블? 직원이 예약 명단과 대조하며 혼란스러워한다. 😅" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "레스토랑 입구에서 자고 싶다고? 직원이 정중하게 돌아서라고 한다. 😶" }
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
                feedback: "코스 메뉴 선택! 앙트레, 플라, 디저트까지 차례로 나온다. 훌륭한 점심! 🍽️✨" },
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
        location: "Café de Flore", emoji: "🌸",
        intro: "점심. 유명 카페에서 가볍게 크로크무슈 한 장.",
        interactions: [
          {
            setup: "자리에 앉자 웨이터가 주문을 받으러 왔다.",
            npcName: "Serveur", npcFrench: '"Bonjour ! Vous désirez ?"',
            npcMeaning: "안녕하세요! 무엇을 드릴까요?",
            options: [
              { text: "Bonjour !\nUn croque-monsieur\net une salade, s'il vous plaît.", correct: true,
                meaning: "안녕하세요! 크로크무슈(구운 햄치즈 샌드위치)와 샐러드 부탁해요.",
                feedback: "크로크무슈(구운 햄치즈 샌드위치)와 샐러드! 파리 카페의 정석 점심. 🥪🥗" },
              { text: "Bonsoir !\nUn steak frites,\ns'il vous plaît.", correct: false,
                feedback: "점심에 저녁 인사에 스테이크를? 웨이터가 어색하게 웃으며 메뉴판을 다시 준다. 🥩" },
              { text: "Le plat du jour,\ns'il vous plaît.", correct: false,
                feedback: "오늘의 특선을 주문했다. 나쁘진 않지만 크로크무슈가 더 먹고 싶었다. 😑" },
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
        location: "Boulangerie Dupont", emoji: "🥖",
        intro: "오후 4시. 달콤한 간식 시간. 골목 안 작은 빵집이 눈에 들어왔다.",
        interactions: [
          {
            setup: "빵집 문을 열고 들어섰다. 빵 굽는 향기가 가득하다. 주인 아주머니가 고개를 든다.",
            npcName: "Patronne", npcFrench: '"Bonjour, Monsieur/Madame !"',
            npcMeaning: "안녕하세요!",
            options: [
              { text: "Bonjour !\nUn pain au chocolat,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 팽 오 쇼콜라(초콜릿 크루아상) 하나 부탁해요.",
                feedback: "인사와 주문 모두 완벽! 갓 구운 팽 오 쇼콜라, 초콜릿이 녹아 흘러내린다. 🍫🥐" },
              { text: "Bonsoir !\nUn croissant,\ns'il vous plaît.", correct: false,
                feedback: "오후 4시에 저녁 인사에 크루아상? 아주머니가 어색하게 웃으며 크루아상을 준다. 😅" },
              { text: "Bonjour !\nUn café au lait,\ns'il vous plaît.", correct: false,
                feedback: "빵집에서 카페오레를? 아주머니가 '저희는 빵만 팔아요'라고 한다. ☕" },
              { text: "Un pain au chocolat,\nmerci !", correct: false,
                feedback: "인사 없이 바로 주문. 아주머니가 살짝 당황하지만 빵을 준다. 분위기가 싸늘하다. 🥶" }
            ],
            hpChange: { success: 5, fail: -5 }
          },
          {
            setup: "아주머니가 빵을 봉투에 담아 건네며 말한다.",
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
        location: "Berthillon — Glacier", emoji: "🍦",
        intro: "오후 3시. 파리에서 가장 유명한 아이스크림 가게. 줄이 길다!",
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
              { text: "Vanille et chocolat,\ns'il vous plaît.", correct: true,
                meaning: "바닐라와 초콜릿으로 부탁해요.",
                feedback: "바닐라와 초콜릿! 베르티옹 최고의 콤비. 파리 센 강변에서 먹는 아이스크림. 🍦❤️" },
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
        location: "Salon de Thé Angelina", emoji: "🍵",
        intro: "오후 4시. 파리 최고의 살롱 드 테. 몽블랑 케이크가 유명하다.",
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
              { text: "Un thé et\nun mont-blanc,\ns'il vous plaît.", correct: true,
                meaning: "차 하나와 몽블랑 케이크 부탁해요.",
                feedback: "홍차와 몽블랑 케이크! 살롱 드 테의 정석 오더. 크림이 넘치는 케이크가 나왔다. 🍵🍰" },
              { text: "Un café et\nun croissant,\ns'il vous plaît.", correct: false,
                feedback: "카페와 크루아상을 주문했다. 나쁘지 않지만 몽블랑이 눈에 밟힌다. ☕🥐" },
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
        location: "Marché Bastille", emoji: "🛒",
        intro: "오후 4시 30분. 바스티유 야외 시장. 과일을 사보자.",
        interactions: [
          {
            setup: "딸기 가판대 앞에 섰다. 상인 아저씨가 반갑게 인사한다.",
            npcName: "Marchand", npcFrench: '"Bonjour ! Vous désirez ?"',
            npcMeaning: "안녕하세요! 무엇을 원하세요?",
            options: [
              { text: "Bonjour !\nC'est combien,\nles fraises ?", correct: true,
                meaning: "안녕하세요! 딸기 얼마예요?",
                feedback: "'딸기 얼마예요?' 상인이 '킬로당 4유로요!'라고 밝게 대답한다. 🍓" },
              { text: "Bonsoir !\nJe voudrais\ndes pommes.", correct: false,
                feedback: "저녁 인사에 사과를? 딸기 가판대에서. 상인이 사과는 저쪽에 있다고 알려준다. 🍎" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "시장에서 계산서를? 상인이 어이없어하며 웃는다. 😂" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "시장 한가운데서 자고 싶다고? 상인이 걱정스러운 눈빛을 보낸다. 😴" }
            ],
            hpChange: { success: 5, fail: -5 }
          },
          {
            setup: "상인이 킬로당 가격을 알려줬다.",
            npcName: "Marchand", npcFrench: '"Quatre euros le kilo !"',
            npcMeaning: "킬로당 4유로예요!",
            options: [
              { text: "Un kilo,\ns'il vous plaît.", correct: true,
                meaning: "1킬로 부탁해요.",
                feedback: "1킬로 주문! 상인이 신선한 딸기를 봉투에 담아준다. 간식으로 완벽. 🍓✨" },
              { text: "Deux kilos,\ns'il vous plaît.", correct: false,
                feedback: "2킬로는 너무 많다. 혼자 다 먹기 힘들다. 8유로를 냈다. 💸" },
              { text: "Non, merci.", correct: false,
                feedback: "'아니요'라고 했다. 상인이 씩 웃으며 '다음에 또 오세요!'라고 한다. 간식 없음. 😑" },
              { text: "C'est combien ?", correct: false,
                feedback: "방금 킬로당 4유로라고 했는데 또 얼마냐고? 상인이 다시 한번 설명해 준다. 😮‍💨" }
            ],
            hpChange: { success: 20, fail: -8 }
          }
        ]
      },
      {
        location: "Pâtisserie Paul", emoji: "🧁",
        intro: "오후 3시 30분. 파티스리 쇼윈도에 에클레르가 눈에 들어왔다.",
        interactions: [
          {
            setup: "파티스리 카운터 앞에 섰다. 직원이 눈을 마주치며 말한다.",
            npcName: "Vendeuse", npcFrench: '"Bonjour ! Je vous écoute."',
            npcMeaning: "안녕하세요! 말씀하세요.",
            options: [
              { text: "Bonjour !\nUn éclair au chocolat,\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 초콜릿 에클레르 하나 부탁해요.",
                feedback: "에클레르 오 쇼콜라 주문 완료! 초콜릿 크림이 가득 찬 에클레르가 나왔다. 🍫✨" },
              { text: "Bonsoir !\nUn croissant,\ns'il vous plaît.", correct: false,
                feedback: "오후에 저녁 인사에 크루아상을? 직원이 어색하게 웃으며 크루아상을 꺼낸다. 🥐" },
              { text: "Je voudrais\nle plat du jour.", correct: false,
                feedback: "파티스리에서 오늘의 특선을? '저희는 케이크만 팔아요'라는 대답이 돌아온다. 😅" },
              { text: "L'addition,\ns'il vous plaît.", correct: false,
                feedback: "주문도 안 하고 계산서를! 직원이 당황해한다. 😵" }
            ],
            hpChange: { success: 5, fail: -5 }
          },
          {
            setup: "에클레르를 포장해 준다. 직원이 묻는다.",
            npcName: "Vendeuse", npcFrench: '"C\'est tout ?"',
            npcMeaning: "이게 전부인가요?",
            options: [
              { text: "Oui,\nc'est pour offrir.", correct: true,
                meaning: "네, 선물용이에요.",
                feedback: "'네, 선물용이에요.' 직원이 예쁜 리본 상자에 담아준다. 완벽한 파리 기념품! 🎁🍫" },
              { text: "Oui,\nc'est pour manger ici.", correct: false,
                feedback: "'여기서 먹을게요.' 직원이 접시에 담아준다. 카페처럼 먹게 됐다. 나쁘진 않다. 🍽️" },
              { text: "Non,\nencore une fois.", correct: false,
                feedback: "'한 번 더'라고 했다. 에클레르가 두 개가 됐다. 지갑이 얇아진다. 💸🍫" },
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
        location: "Bistro Le Marché", emoji: "🍷",
        intro: "저녁 7시 30분. 파리에 노을이 진다. 아늑한 비스트로가 기다린다.",
        interactions: [
          {
            setup: "비스트로 문을 열었다. 매니저가 반갑게 맞이한다.",
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
            setup: "메뉴를 보다 스테이크 프리트(스테이크 + 감자튀김)로 결정했다. 웨이터가 왔다.",
            npcName: "Serveur", npcFrench: '"Qu\'est-ce que vous prenez ?"',
            npcMeaning: "무엇으로 하시겠어요?",
            options: [
              { text: "Je voudrais\nun steak frites,\ns'il vous plaît.", correct: true,
                meaning: "스테이크 프리트(스테이크와 감자튀김)로 할게요.",
                feedback: "완벽한 주문! 풍성한 스테이크 프리트가 나온다. 오늘의 하이라이트! 🥩🍟" },
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
        location: "Restaurant Chez Fonfon", emoji: "🌿",
        intro: "저녁 7시. 프로방스 요리 전문점. 부야베스를 먹어보자.",
        interactions: [
          {
            setup: "레스토랑 문을 열었다. 저녁이라 꽤 붐빈다.",
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
            setup: "메뉴를 훑어보다 부야베스(프로방스 생선 스튜)로 결정했다.",
            npcName: "Serveur", npcFrench: '"Qu\'est-ce que vous désirez comme plat ?"',
            npcMeaning: "어떤 요리로 하시겠어요?",
            options: [
              { text: "Je voudrais\nla bouillabaisse,\ns'il vous plaît.", correct: true,
                meaning: "부야베스(프로방스 해산물 스튜)로 할게요.",
                feedback: "부야베스 완벽 주문! 신선한 해산물과 사프란 향이 가득한 스튜가 나온다. 🦞🍲" },
              { text: "Un steak frites,\ns'il vous plaît.", correct: false,
                feedback: "프로방스 레스토랑에서 스테이크 프리트? 웨이터가 살짝 아쉬운 표정이다. 나쁘진 않다. 🥩" },
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
        location: "Brasserie de l'Est", emoji: "🍺",
        intro: "저녁 8시. 알자스 전통 브라스리. 돼지 요리와 맥주로 유명하다.",
        interactions: [
          {
            setup: "웨이터가 인원 수를 물어본다.",
            npcName: "Serveur", npcFrench: '"Bonsoir ! Vous êtes combien ?"',
            npcMeaning: "안녕하세요! 몇 분이세요?",
            options: [
              { text: "Bonsoir !\nJe suis seul(e),\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 혼자예요.",
                feedback: "'혼자예요.' 웨이터가 바 테이블의 편안한 자리로 안내한다. 혼밥의 낭만! 🍺🪑" },
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
            setup: "메뉴를 보다 물 프리트(홍합 + 감자튀김)와 맥주로 결정했다.",
            npcName: "Serveur", npcFrench: '"Vous avez choisi ?"',
            npcMeaning: "주문 결정하셨나요?",
            options: [
              { text: "Je voudrais des\nmoules frites et\nune bière, s'il vous plaît.", correct: true,
                meaning: "홍합 프리트(홍합·감자튀김)와 맥주 하나 부탁해요.",
                feedback: "물 프리트(홍합+감자튀김)와 맥주! 알자스 브라스리의 정석. 홍합이 수북하게 나온다. 🦪🍺✨" },
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
        location: "Ristorante Da Mario", emoji: "🍕",
        intro: "저녁 7시 30분. 파리에는 이탈리안 레스토랑도 많다. 오늘은 피자!",
        interactions: [
          {
            setup: "이탈리안 레스토랑 문을 열었다. 반가운 인사를 건네는 직원.",
            npcName: "Serveur", npcFrench: '"Bonsoir ! Vous êtes combien ce soir ?"',
            npcMeaning: "안녕하세요! 오늘 저녁 몇 분이세요?",
            options: [
              { text: "Bonsoir !\nJe suis seul(e),\ns'il vous plaît.", correct: true,
                meaning: "안녕하세요! 혼자예요.",
                feedback: "저녁 인사와 1인 확인! 테라스 쪽 아늑한 자리로 안내받는다. 🍕🌙" },
              { text: "Bonjour !\nDeux personnes.", correct: false,
                feedback: "저녁에 아침 인사에 2인 자리? 직원이 어색하게 웃으며 자리로 안내한다. 😅" },
              { text: "Bonsoir !\nL'addition,\ns'il vous plaît.", correct: false,
                feedback: "들어오자마자 계산서를? 직원이 황당해한다. 😵" },
              { text: "Je voudrais dormir.", correct: false,
                feedback: "레스토랑에서 자고 싶다고? 직원이 정중하게 '저희는 식당이에요'라고 한다. 😴" }
            ],
            hpChange: { success: 5, fail: -8 }
          },
          {
            setup: "메뉴를 보다 마르게리타 피자로 결정했다.",
            npcName: "Serveur", npcFrench: '"Qu\'est-ce que vous prenez ?"',
            npcMeaning: "무엇으로 하시겠어요?",
            options: [
              { text: "Une pizza\nmargherita,\ns'il vous plaît.", correct: true,
                meaning: "마르게리타 피자 하나 부탁해요.",
                feedback: "마르게리타 피자 완벽 주문! 얇은 도우에 신선한 토마토소스와 모짜렐라. 🍕✨" },
              { text: "Un steak frites,\ns'il vous plaît.", correct: false,
                feedback: "이탈리안 레스토랑에서 스테이크 프리트? 직원이 잠시 고민하더니 '없어요'라고 한다. 🥩" },
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
        location: "Bistrot Chic — Le Dôme", emoji: "🥂",
        intro: "저녁 8시. 오늘은 특별한 날. 분위기 좋은 레스토랑에서 저녁을.",
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
            setup: "음식을 주문했다. 이번엔 와인을 곁들이고 싶다.",
            npcName: "Serveur", npcFrench: '"Et comme boisson ?"',
            npcMeaning: "음료는 어떻게 하시겠어요?",
            options: [
              { text: "Un verre de vin\nrouge, s'il vous plaît.", correct: true,
                meaning: "레드와인 한 잔 부탁해요.",
                feedback: "레드와인 한 잔! 소믈리에가 자신 있게 추천 와인을 따라준다. 오늘 저녁은 완벽하다. 🍷✨" },
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
