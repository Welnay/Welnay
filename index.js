const { Client, Intents, MessageAttachment, IntegrationApplication, Message, GuildMember, Interaction } = require('discord.js');
const { token, prefix, guildId, clientId } = require('./config.json');
const { MessageActionRow, MessageButton, MessageSelectMenu, messageCreate, Permissions, CommandInteraction } = require('discord.js');
const { c } = require('tar');
const { channel } = require('diagnostics_channel');
const wait = require('node:timers/promises').setTimeout;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING ] });

client.once('ready', () => {
	console.log('WellBot démarré');
	client.user.setStatus('dnd');
    const guild = client.guilds.cache.get(guildId);
    const memberCount = guild.memberCount
    const activities = [
        `${memberCount} utilisateurs !`
      ];
    setInterval(() => {
		const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
		const newActivity = activities[randomIndex];
	
		client.user.setActivity(newActivity);
	  }, 10000);
});

client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return;
	
	const { commandName } = interaction;
	const message = Message;

	if (commandName == 'menu') {
		const emojidanger = client.emojis.cache.get("959649228454526986")
		const emojicheck = client.emojis.cache.get('959649229507280896')
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('accepte')
					.setLabel('Accepter le règlement')
					.setStyle('SUCCESS')
					.setEmoji('959649229507280896'),
				new MessageButton()
					.setCustomId('menubutton')
					.setLabel('Menu de sélection')
					.setStyle('PRIMARY')
					.setEmoji('964300994299166780'),
			);
		
		const embed = {
			color: 0xb00000,
			description: `\n${emojidanger} **__Le règlement est considéré comme lu et approuvé par tous les membres. ${emojicheck}__**\n `,
			timestamp: new Date(),
			footer: {
				text: 'WellBot',
				icon_url: 'https://media.discordapp.net/attachments/964275207210688512/964300541532446770/unknown.png',
			},
		};
		interaction.channel.send({ embeds: [embed], components: [row] })
		interaction.reply({content: 'Message correctement publié.', ephemeral: true})
	}
});

client.on('interactionCreate', interactionregle => {
	if (!interactionregle.isButton()) return;

	const auteur = interactionregle.member;

	const role = '959608528459407470';
	const emojicheck = client.emojis.cache.get('959649229507280896');
	const emojino = client.emojis.cache.get('964308916005666836');
	
	if (interactionregle.customId === 'accepte') {
		if (auteur.roles.cache.some(role => role.id === '959608528459407470')) {
			interactionregle.reply({ content: `${emojino} **Vous ne pouvez pas refuser le règlement.**`, ephemeral: true})
		} else {
			auteur.roles.add('959608528459407470');
			interactionregle.reply({ content: `${emojicheck} **Vous avez acceptez le règlement, vous avez maintenant accès au discord.**`, ephemeral: true})
		}
	}
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;

	const auteur = interaction.member;
	const interaction1m = interaction;

	if (interaction.customId === 'menubutton') {
		const emojicouleurs = client.emojis.cache.get('964488402827345930');
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('menu1')
					.setPlaceholder('Choisis une catégorie.')
					.addOptions([
						{
							label: 'Informations',
							description: 'Avoir des informations sur Welnay.',
							value: 'informations',
							emoji: '964303930366525480',
						},
						{
							label: 'Jeux',
							description: 'Récupérer un/des rôles correspondant à un/des jeu(x).',
							value: 'jeux',
							emoji: '964488894819229716',
						},
						{
							label: 'Couleurs',
							description: 'Récupérer un rôle correspondant à une couleur.',
							value: 'couleurs',
							emoji: '964489051057049610',
						},
						{
							label: 'Âge',
							description: 'Récupérer un rôle correspondant à votre âge.',
							value: 'age',
							emoji: '964303930244882462',
						}
					]),
			);
		
		const emojiselection = client.emojis.cache.get('964300994299166780');
		interaction.channel.send({ content: `${emojiselection} **Bienvenue dans le menu d'intéraction <@${auteur.id}> !**`, components: [row] })

		client.on('interactionCreate', async interaction => {
			if (!interaction.isSelectMenu()) return;
		
			if (interaction.customId === 'menu1') {
				if (interaction.values[0] === 'informations') {
					interaction1m.delete();
				}
			}
		});
	}
})

client.login(token);
