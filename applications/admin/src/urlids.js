import Hashids from "hashids";

const hashids = new Hashids("poolboy", 8, "abcdefghijklmnopqrstuvwxyz");

export const fromId = (number) => {
    let output = hashids.encode(number);
    if (output === "") console.log("WARNING: got garbage when hashid-encoding", number);
    return output;
};

export const toId = (hash) => {
    return hashids.decode(hash)[0];
};
