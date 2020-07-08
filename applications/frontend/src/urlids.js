import Hashids from "hashids";

const hashids = new Hashids("poolboy", 8, "abcdefghijklmnopqrstuvwxyz");

export const encodeId = (number) => {
    let output = hashids.encode(number);
    if (output === "") console.log("WARNING: got garbage when hashid-encoding", number);
    return output;
};

export const decodeId = (hash) => {
    return hashids.decode(hash)[0];
};
