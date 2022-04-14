const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('infos')
        .setDescription('Quelques informations')
        .addStringOption(option => 
            option.setName('infos')
            .setDescription('Que veux-tu savoir ?')
            .setRequired(true)
            .addChoice('Configuration PC', '1')
            .addChoice('Mes périphériques', '2')
            .addChoice('Vidéo favorite du moment', '3')),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const choice = interaction.options.getString('choice');

        await interaction.reply(choice);
    }
}