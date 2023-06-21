export function getAddressFromDid(did: string) {
    return did.slice(did.lastIndexOf(":") + 1);
}

export function addressAbbreviation(address?: string) {
    if (!address) return;
    return `${address.slice(0, 6)}...${address.slice(-4, address.length)}`;
}

export function objectToArray(object:any) {
    const result=[]
    for(const key in object) {
        result.push(object[key]?.streamContent.content)
    }
    return result
}
