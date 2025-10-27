// js/typing.js
export function initTyping() {
  const languages = [
    { text: '“וְכָל הַמְקַבֵּל אֹתוֹ, נָתַן לוֹ זְכוּת לִהְיוֹת בֵּן אֱלֹהִים”' },
    { text: '“ܘܟܠ ܕܩܒܠܘܗܝ ܝܗܒ ܠܗܘܢ ܫܘܠܛܢܐ ܕܢܗܘܘܢ ܒܢܝܐ ܕܐܠܗܐ”' },
    { text: '“But as many as received him, to them gave he power to become the sons of God.” (John 1:12)' }
  ];

  let languageIndex = 0;
  let charIndex = 0;

  function typeText() {
    const text = languages[languageIndex].text;
    const typedText = document.getElementById('typed-text');
    typedText.textContent = text.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex >= text.length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        charIndex = 0;
        languageIndex = (languageIndex + 1) % languages.length;
        typingInterval = setInterval(typeText, 70);
      }, 2500);
    }
  }

  let typingInterval = setInterval(typeText, 70);
}
