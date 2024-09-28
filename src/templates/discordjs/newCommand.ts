const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("{{componentName}}")
    .setDescription("{{componentDescription}}"),
  async execute(interaction) {
    await interaction.reply(
      "Why did the C++ programmer get lost? He took the wrong branch"
    );
  },
};
