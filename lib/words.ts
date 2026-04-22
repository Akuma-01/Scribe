const COMMON_WORDS = [
    "the", "of", "and", "a", "to", "in", "is", "you", "that", "it", 
    "he", "was", "for", "on", "are", "as", "with", "his", "they", "I", 
    "at", "be", "this", "have", "from", "or", "one", "had", "by", "word", 
    "but", "not", "what", "all", "were", "we", "when", "your", "can", "said", 
    "there", "use", "an", "each", "which", "she", "do", "how", "their", "if", 
    "will", "up", "other", "about", "out", "many", "then", "them", "these", "so", 
    "some", "her", "would", "make", "like", "him", "into", "time", "has", "look", 
    "two", "more", "write", "go", "see", "number", "no", "way", "could", "people", 
    "my", "than", "first", "water", "been", "call", "who", "oil", "its", "now", 
    "find", "long", "down", "day", "did", "get", "come", "made", "may", "part", 
    "over", "new", "sound", "take", "only", "little", "work", "know", "year", "live", 
    "me", "back", "give", "most", "very", "after", "thing", "our", "just", "name", 
    "good", "sent", "man", "say", "help", "line", "much", "mean", "move", "right", 
    "boy", "old", "too", "same", "tell", "does", "set", "three", "want", "air", 
    "well", "also", "play", "small", "end", "put", "home", "read", "hand", "port", 
    "large", "spell", "add", "even", "land", "here", "must", "big", "high", "such", 
    "follow", "act", "why", "ask", "men", "change", "went", "light", "kind", "off", 
    "need", "house", "picture", "try", "us", "again", "animal", "point", "mother", "world", 
    "near", "build", "self", "earth", "father", "head", "stand", "own", "page", "should", 
    "country", "found", "answer", "school", "grow", "study", "still", "learn", "plant", "cover", 
    "food", "sun", "four", "state", "keep", "eye", "never", "last", "let", "city", 
    "tree", "cross", "farm", "hard", "start", "might", "story", "saw", "far", "sea", 
    "draw", "left", "late", "run", "don't", "while", "press", "close", "night", "real", 
    "life", "few", "north", "open", "seem", "next", "white", "children", "begin", "got", 
    "walk", "example", "ease", "paper", "group", "always", "music", "those", "both", "mark", 
    "often", "letter", "until", "mile", "river", "car", "feet", "care", "second", "book", 
    "carry", "took", "science", "eat", "room", "friend", "began", "idea", "fish", "mountain", 
    "stop", "once", "base", "hear", "horse", "cut", "sure", "watch", "color", "face", 
    "wood", "main", "plain", "girl", "usual", "young", "ready", "above", "ever", "red", 
    "list", "though", "feel", "talk", "bird", "soon", "body", "dog", "family", "direct", 
    "pose", "leave", "song", "measure", "door", "product", "black", "short", "numeral", "class", 
    "wind", "question", "happen", "complete", "ship", "area", "half", "rock", "order", "fire", 
    "south", "problem", "piece", "told", "knew", "pass", "since", "top", "whole", "king", 
    "street", "inch", "multiply", "nothing", "course", "stay", "wheel", "full", "force", "blue", 
    "object", "decide", "surface", "deep", "moon", "island", "foot", "system", "busy", "test", 
    "record", "boat", "common", "gold", "possible", "plane", "stead", "dry", "wonder", "laugh", 
    "thousand", "ago", "ran", "check", "game", "shape", "equate", "hot", "miss", "brought", 
    "heat", "snow", "tire", "bring", "yes", "distant", "fill", "east", "paint", "language", 
    "among", "grand", "ball", "yet", "wave", "drop", "heart", "am", "present", "heavy", 
    "dance", "engine", "position"
];

export function generateWords(count: number = 100): string[] {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * COMMON_WORDS.length);
        words.push(COMMON_WORDS[randomIndex]);
    }
    return words;
}
