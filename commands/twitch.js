const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twitch')
        .setDescription('Donne le liens de ma chaîne Twtich'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
     async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(new MessageButton()
                .setLabel('Twitch')
                .setStyle('LINK')
                .setURL('https://twitch.tv/welnay_')
            );

        await interaction.reply({ content: '> Clique sur bouton ci-dessous pour voir ma chaîne Twitch', components: [row] });
    }
}