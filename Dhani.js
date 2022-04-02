const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const fs = require("fs")
const axios = require('axios')
const os = require('os')
const speed = require("performance-now")
const util = require('util')
const crypto = require('crypto')
const request = require('request')
const { exec, spawn } = require('child_process')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')

//══════════[ Lib ]══════════//

const { fetchJosn, fetchText } = require('./lib/fetcher')
const { color, bgcolor } = require('./lib/color')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const setting = JSON.parse(fs.readFileSync('./setting.json'))

owner = setting.OwnerNumber
botname = setting.BotName
ownername = setting.OwnerName
const fakeimage = fs.readFileSync ('./media/dhani.jpg')
const thumb = fs.readFileSync ('./media/thumb.jpg')

const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if(time2 < "23:59:00"){
        var ucapanWaktu = 'Selamat Malam 🌌'
}
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'Selamat Petang 🌆'
}
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'Selamat Sore 🌇'
}
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'Selamat Siang 🏞'
}
        if(time2 < "11:00:00"){
        var ucapanWaktu = 'Selamat Pagi 🌅'
}
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'Selamat malam 🏙'
}

module.exports = Dhani = async (Dhani, mek, _welkom) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.blocked
    	mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
		const tanggal = moment.tz('Asia/Jakarta').format('dddd') + ', ' + moment.tz('Asia/Jakarta').format('LL')
		const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
		const timeMak = moment().tz('Asia/Makassar').format("HH:mm:ss");
        const timeJay = moment().tz('Asia/Jayapura').format("HH:mm:ss");
        const type = Object.keys(mek.message)[0]        
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        const prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : '#'          	
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
		const args = body.trim().split(/ +/).slice(1)
		const arg = budy.slice(command.length + 2, budy.length)
		const c = args.join(' ')
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')
		const txt = mek.message.conversation
		const botNumber = Dhani.user.jid
		const ownerNumber = [`${owner}@s.whatsapp.net`, `6281333603591@s.whatsapp.net`]
		const isGroup = from.endsWith('@g.us')
		let sender = isGroup ? mek.participant : mek.key.remoteJid
		let senderr = mek.key.fromMe ? Dhani.user.jid : mek.key.remoteJid.endsWith('@g.us') ? mek.participant : mek.key.remoteJid
		const groupMetadata = isGroup ? await Dhani.groupMetadata(from) : ''.toString
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const conts = mek.key.fromMe ? Dhani.user.jid : Dhani.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? Dhani.user.name : conts.notify || conts.vname || conts.name || '-'    
    
		const isOwner = ownerNumber.includes(sender)

mess = {
wait: 'Proses kak',
eror: 'Maaf terjadi kesalahan !!',
success: 'Sukses️',
error: {
stick: 'Itu bukan sticker kak !!',
Iv: 'Link invalid !!'
},
only: {
prem: 'Fitur khusus member premium !!',
group: 'Fitur khusus grup !!',
owner: 'Fitur khusus owner !!',
admin: 'Fitur khusus admin !!',
Badmin: 'Silakan jadikan bot admin dulu !!'
}
}

const math = (teks) => {
return Math.floor(teks)
}
const runtime = function (seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor((seconds % (3600 * 24)) / 3600);
var m = Math.floor((seconds % 3600) / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " Hari, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " Jam, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " Menit, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " Detik") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
};

const listmsg = (from, title, desc, list) => {
let po = Dhani.prepareMessageFromContent(from, {"listMessage": {"title": title,"description": desc,"buttonText": "𝗠𝗘𝗡𝗨","footerText": ` `,"listType": "SINGLE_SELECT","sections": list}}, {})
return Dhani.relayWAMessage(po, {waitForAck: true})
}
const reply = (teks) => {
Dhani.sendMessage(from, teks, text, {quoted:mek})
}
const sendMess = (hehe, teks) => {
Dhani.sendMessage(hehe, teks, text)
}
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? Dhani.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : Dhani.sendMessage(from, teks.trim(), extendedText, { quoted: fgi, contextInfo: { "mentionedJid": memberr } })
}
const costum = (pesan, tipe, target, target2) => {
Dhani.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
}
const ftrol = { key : { participant : '0@s.whatsapp.net' }, message: { orderMessage: { itemCount : 5555, status: 1, surface : 1, message: `${ucapanWaktu} ${pushname}`, orderTitle: `${ucapanWaktu} ${pushname}`, thumbnail: thumb, sellerJid: '0@s.whatsapp.net' }}}
const fgi = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {}) }, message: { "videoMessage": { "title": `${ucapanWaktu} ${pushname}`, "h": `${ucapanWaktu} ${pushname}`, 'duration': '99999', 'gifPlayback': 'true', 'caption': `${ucapanWaktu} ${pushname}`, 'jpegThumbnail': thumb }}}
const textImg = (teks) => { return Dhani.sendMessage(from, teks, text, {quoted: fgi, thumbnail: fs.readFileSync('./media/thumb.jpg')})}
const fakeitem = (teks) => { Dhani.sendMessage(from, teks, text, { quoted: { key:{ fromMe:false, participant:`0@s.whatsapp.net`, ...(from ? { remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync("./media/thumb.jpg"),"itemCount":9999999999,"status":"INQUIRY","surface":"CATALOG","message": `${ucapanWaktu} ${pushname}`,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},contextInfo: {"forwardingScore":999,"isForwarded":true}, sendEphemeral: true})}

const sendMediaURL = async(to, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(to, text, mids)
}
const fn = Date.now() / 10000;
const filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
console.log('done');
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
}
Dhani.sendMessage(to, media, type, { quoted: fgi, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
fs.unlinkSync(filename)
});
}  

		colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
      	if (!isGroup && isCmd) console.log('\x1b[1;31m[ PC\x1b[1;37m ]', '[\x1b[1;32m PRIBADI \x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
     	if (isCmd && isGroup) console.log('\x1b[1;31m[ GC\x1b[1;37m ]', '[\x1b[1;32m GROUP \x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
switch (command) {

//══════════[ FITUR FITURNYA UY ]══════════//

case 'menu':
case 'help':
menu = `Hi ${pushname} ${ucapanWaktu}

*❏「 WAKTU INDONESIA 」*
*TANGGAL* : ${tanggal}
*WIB* : ${time}
*WITA* : ${timeMak}
*WIT* : ${timeJay}


*「 STORE MENU 」*
${prefix}feerekber
${prefix}mulairekber
${prefix}sudahbayar
${prefix}sudahditerima
${prefix}list`
fakeitem(menu)
break
case 'feerekber':
fs.readFileSync ('./media/feerekber.jpg')
Dhani.sendMessage(from, feerekber, image, {caption: 'Ini kak berikut informasi nom dan fee jasa lunasinrekber :)', quoted: mek, contextInfo: { mentionedJid: [sender]}})
break
case 'mulairekber':
menu = `Hai, Terimakasih sudah mempercayai Jasa Rekber atau ( Rekening Bersama ) by lunasinrekber 🤗

FORMAT TRANSAKSI

Penjual  :
Pembeli :
Penjualan Apa :
Harga Jual :
Inc/Ex fee  :
Pembayaran :
Refull/Noreff :

> INFO TRANSAKSI :
#Noreff : Tidak garansi
#Refull : Garansi
#Ex : Fee Ditanggung pembeli
#Inc : Fee Ditanggung Penjual

> KETENTUAN TRANSAKSI
#Jadikan saya Adm di Group ini
#Barang/akun yg dijual/Beli adalah Barang/Akun yg LEGAL
#Jika Transaksi Cancel Fee tetap Terpotong, jika tdk mau Terpotong Silahkan cari penjual lain

Jika Setuju Silahkan isi Format 🙏🏻`
Dhani.sendMessage(from, menu, text, {quoted: mek, contextInfo: { mentionedJid: [sender]}})
break
case 'sudahbayar':
menu = `DANA Sdh Masuk di ADMIN
Silahkan PENJUAL Menyerahkan data nya ke PEMBELI . Jika akun sudah aman dipembeli Silahkan Konfirmasi DONE sebagai tanda Akun Sudah diCek+Diamankan 
----------------------------------------------------
:: ATURAN TRANSAKSI ::

#KHUSUS TRANSAKSI ML 
>Seller Wajib CE moonton 
>Pembeli dan Penjual sepakat Untuk >Take Segmail Akun Moonton >Penjual , Apabila Terjadi Nomor lengket , Pembeli berhak Cancel/Menunggu sampai Nomor tidak lengket 

KHUSUS TRANSAKSI COC/YT
>Penjual Wajib yg mengubah data pembeli mulai dari Nomor pemulihan, V2l , email pemulihan, untuk menghindari akun kenonaktif/nomor lengket

#Ketentuan Transaksi 
> Apabila Dana sdh masuk Di admin dan tidak ada Konfirmasi dari pembeli Selama 5 Jam, DANA Akan dicairkan Ke penjual

> Jika Transaksi Cancel PEMBELI DAN PENJUAL Wajib Konfirmasi DI MC
Jika tidak ada Konfirmasi dari penjual selama 1 jam maka pembeli berhak mencari Penjual lain 

‼️Jika Transaksi Noreff SETELAH TRANSAKSI SELESAI Segala bentuk resiko DILUAR TANGGUNG JAWAB ADMIN‼️

Jika sudah, silahkan ketik #sudahditerima`
Dhani.sendMessage(from, menu, text, {quoted: mek, contextInfo: { mentionedJid: [sender]}})
break
case 'sudahditerima':
menu = `Okey kak, Untuk PENJUAL
mau dicairkan kemana? 

Ovo/Dana/Gopay: 
Nomor : 
Atas Nama :
. 
Nama Bank :
Nomor Rekening :
Atas Nama :
. 
Nomor Tsel :
. 
Silahkan Penjual isi Format Pencairan sesuai keinginan nya ya, Untuk Transaksi pulsa hanya bisa dicairkan Ke Tsel ya tidak bisa yang lain 🙏`
Dhani.sendMessage(from, menu, text, {quoted: mek, contextInfo: { mentionedJid: [sender]}})
break
case 'list':
               list = []
               listmenu = [`feerekber`,`mulairekber`]
               listmenuu = [`FEE REKBER`,`MULAI REKBER`]
               nombor = 1
               startnum = 0
               for (let x of listmenu) {
               const yy = {title: 'Store ke' + nombor++,
                    rows: [
                       {
                        title: `${listmenuu[startnum++]}`,
                        description: ``,
                        rowId: `${prefix}${x}`
                      }
                    ]
                   }
                        list.push(yy)
           }
               listmsg(from, `Hai ${pushname} pilih store disini`,`  `, list)
               break
default:
}
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero") && !e.includes("jid")) {
	console.log('Error : %s', color(e, 'red'))
        }
	// console.log(e)
	}
}


	
    
