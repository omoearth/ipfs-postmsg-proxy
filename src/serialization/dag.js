import { DAGNode, DAGLink } from 'ipld-dag-pb'
import { bufferFromJson, bufferToJson } from './buffer'

export const dagNodeFromJson = (obj) => {
  return new Promise((resolve, reject) => {
    const links = obj.links.map(dagLinkFromJson)
    DAGNode.create(bufferFromJson(obj.data), links, (err, dagNode) => {
      if (err) return reject(err)
      resolve(dagNode)
    })
  })
}

export const dagNodeToJson = (dagNode) => ({
  __ipfsPostMsgProxyType: 'DAGNode',
  links: dagNode.links.map(dagLinkToJson),
  data: bufferToJson(dagNode.data)
})

export const isDagNode = (obj) => obj && obj.constructor && obj.constructor.name === 'DAGNode'
export const isDagNodeJson = (obj) => obj && obj.__ipfsPostMsgProxyType === 'DAGNode'

export const dagLinkFromJson = (obj) => new DAGLink(obj.name, obj.size, obj.multihash)

export const dagLinkToJson = (link) => Object.assign(
  { __ipfsPostMsgProxyType: 'DAGLink' },
  link.toJSON()
)

export const isDagLink = (obj) => obj && obj.constructor && obj.constructor.name === 'DAGLink'
export const isDagLinkJson = (obj) => obj && obj.__ipfsPostMsgProxyType === 'DAGLink'
