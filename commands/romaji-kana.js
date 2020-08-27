const hepburn = require("hepburn");
module.exports = {
	name: 'romaji-kana',
    description: 'Translate Romaji/Kana to corresponding Romaji/Kana',
    args: true,
	usage: '<romaji> or <kana>',
	guildOnly: true,
    cooldown: 2,
    aliases: ['rk'],
	async execute(message, args) {
        let hiragana = [
            //Basic
            "あ", "い", "う", "え", "お",
            "か", "き", "く", "け", "こ",
            "さ", "し", "す", "せ", "そ",
            "た", "ち", "つ", "て", "と",
            "な", "に", "ぬ", "ね", "の",
            "は", "ひ", "ふ", "へ", "ほ",
            "ま", "み", "む", "め", "も",
            "や", "ゆ", "よ",
            "ら", "り", "る", "れ", "ろ",
            "わ", "を", "ん",
            //Voiced
            "が", "ぎ", "ぐ", "げ", "ご",
            "ざ", "じ", "ず", "ぜ", "ぞ",
            "だ", "ぢ", "づ", "で", "ど",
            "ば", "び", "ぶ", "べ", "ぼ",
            "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
            //Combo
            "きゃ", "きゅ", "きょ",
            "しゃ", "しゅ", "しょ",
            "ちゃ", "ちゅ", "ちょ",
            "にゃ", "にゅ", "にょ",
            "ひゃ", "ひゅ", "ひょ",
            "みゃ", "みゅ", "みょ",
            "りゃ", "りゅ", "りょ",
            "ぎゃ", "ぎゅ", "ぎょ",
            "じゃ", "じゅ", "じょ",
            "びゃ", "びゅ", "びょ",
            "ぴゃ", "ぴゅ", "ぴょ"
        ];
        let katakana = [
            //Basic
            "ア", "イ", "ウ", "エ", "オ", 
            "カ", "キ", "ク", "ケ", "コ", 
            "サ", "シ", "ス", "セ", "ソ", 
            "タ", "チ", "ツ", "テ", "ト", 
            "ナ", "ニ", "ヌ", "ネ", "ノ", 
            "ハ", "ヒ", "フ", "ヘ", "ホ", 
            "マ", "ミ", "ム", "メ", "モ", 
            "ヤ", "ユ", "ヨ", 
            "ラ", "リ", "ル", "レ", "ロ", 
            "ワ", "ヲ", "ン", 
            //Voiced
            "ガ", "ギ", "グ", "ゲ", "ゴ", 
            "ザ", "ジ", "ズ", "ゼ", "ゾ", 
            "ダ", "ヂ", "ヅ", "デ", "ド", 
            "バ", "ビ", "ブ", "ベ", "ボ", 
            "パ", "ピ", "プ", "ペ", "ポ", 
            //Combo
            "キャ", "キュ", "キョ", 
            "シャ", "シュ", "ショ", 
            "チャ", "チュ", "チョ", 
            "ニャ", "ニュ", "ニョ", 
            "ヒャ", "ヒュ", "ヒョ", 
            "ミャ", "ミュ", "ミョ", 
            "リャ", "リュ", "リョ", 
            "ギャ", "ギュ", "ギョ", 
            "ジャ", "ジュ", "ジョ", 
            "ビャ", "ビュ", "ビョ", 
            "ピャ", "ピュ", "ピョ" 
        ];
        let romaji = [
            //Basic
            "a", "i", "u", "e", "o",
            "ka", "ki", "ku", "ke", "ko",
            "sa", "shi", "su", "se", "so",
            "ta", "chi", "tsu", "te", "to",
            "na", "ni", "nu", "ne", "no",
            "ha", "hi", "fu", "he", "ho",
            "ma", "mi", "mu", "me", "mo",
            "ya", "yu", "yo",
            "ra", "ri", "ru", "re", "ro",
            "wa", "wo", "n",
            //Voiced
            "ga", "gi", "gu", "ge", "go",
            "za", "ji", "zu", "ze", "zo",
            "da", "ji", "zu", "de", "do",
            "ba", "bi", "bu", "be", "bo",
            "pa", "pi", "pu", "pe", "po",
            //Combo
            "kya", "kyu", "kyo",
            "sha", "shu", "sho",
            "cha", "chu", "cho",
            "nya", "nyu", "nyo",
            "hya", "hyu", "hyo",
            "mya", "myu", "myo",
            "rya", "ryu", "ryo",
            "gya", "gyu", "gyo",
            "ja", "ju", "jo",
            "bya", "byu", "byo",
            "pya", "pyu", "pyo"
        ];

        const conv = hepburn.cleanRomaji(args.join('').toLowerCase());
        if(args.some(r=> romaji.indexOf(r) >= 0)){

            message.channel.send('Hiragana: ' + hepburn.toHiragana(conv) + '\nKatakana: ' + hepburn.toKatakana(conv));

        } else if(args.some(r=> hiragana.indexOf(r) >= 0)){

            message.channel.send('Katakana: ' + hepburn.toKatakana(hepburn.fromKana(conv).toLowerCase()) + '\nRomaji: ' + hepburn.fromKana(conv).toLowerCase());

        } else if(args.some(r=> katakana.indexOf(r) >= 0)){

            message.channel.send('Hiragana: ' + hepburn.toHiragana(hepburn.fromKana(conv).toLowerCase()) + '\nRomaji: ' + hepburn.fromKana(conv).toLowerCase());
            
        }
	},
};
