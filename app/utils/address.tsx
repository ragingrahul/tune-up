export function getAddressFromDid(did: string) {
    return did.slice(did.lastIndexOf(":") + 1);
}

export function addressAbbreviation(address?: string) {
    if (!address) return;
    return `${address.slice(0, 6)}...${address.slice(-4, address.length)}`;
}