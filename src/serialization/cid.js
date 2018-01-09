import CID from 'cids'
import { bufferFromJson, bufferToJson } from './buffer'

export const cidFromJson = (obj) => new CID(obj.version, obj.codec, bufferFromJson(obj.hash))

export const cidToJson = (cid) => ({
  __ipfsPostMsgProxyType: 'CID',
  codec: cid.codec,
  version: cid.version,
  hash: bufferToJson(cid.multihash)
})

export const isCid = CID.isCID
export const isCidJson = (obj) => obj && obj.__ipfsPostMsgProxyType === 'CID'
