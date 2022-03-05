import crypto from "crypto";

const users = [{
    id: crypto.randomUUID(),
    name: "Pedro",
    city: "Angelandia",
}];

export default users;