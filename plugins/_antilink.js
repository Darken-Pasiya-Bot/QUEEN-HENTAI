
const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, {conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.reply(m.chat, `*⃝❤️ ᴅͯ͜ᴀͯʀᴋᴇ͠ɴ ᴘᴀ͡ꜱɪʏᴀ͢🖤⃠ Link Detected*
            
⃝❤️ ᴅͯ͜ᴀͯʀᴋᴇ͠ɴ ᴘᴀ͡ꜱɪʏᴀ͢🖤⃠ doesn't allow links from other groups. 
I'M Sorry, ⃝❤️ ᴅͯ͜ᴀͯʀᴋᴇ͠ɴ ᴘᴀ͡ꜱɪʏᴀ͢🖤⃠ WA BOT *@${m.sender.split('@')[0]}*  Will Be Kicked Out Of The Group 😁 ${isBotAdmin ? '' : '\n\n⃝❤️ ᴅͯ͜ᴀͯʀᴋᴇ͠ɴ ᴘᴀ͡ꜱɪʏᴀ͢🖤⃠ Not An Admin So I Cannot fuck off 🤣 You :"v'}`, null, { mentions: [m.sender] } )
        if (isBotAdmin && chat.antiLink) {
        	await conn.sendMessage(m.chat, { delete: m.key })
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!chat.antiLink) return //m.reply('')
    }
    return !0
}
