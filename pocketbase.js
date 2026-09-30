import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


/** @return { import("next-auth/adapters").Adapter } */
export default function PocketBaseDB(client, options = {}) {
    return {
        async createUser(user) {
            try {
                // example create body
                const body = {
                    "email": user.email,
                    "emailVisibility": false,
                    "name": user.name,
                    "role": "Pending",
                    "beta_tester": false,
                    //I am not using password authentication
                    "password": "123456789",
                    "passwordConfirm": "123456789"
                };

                const record = await pb.collection('users').create(body);
            }
            catch (error) {
                console.log("Error creating user")
            }
            return
        },
        async getUser(id) {
            if(id) {
                const record = await pb.collection('users').getOne(id, {
                    expand: 'relField1,relField2.subRelField',
                });
            } else {
                console.log("No ID registered")
            }
            return
        },
        async getUserByEmail(email) {
            return
        },
        async getUserByAccount({ providerAccountId, provider }) {
            return
        },
        async updateUser(user) {
            return
        },
        async deleteUser(userId) {
            return
        },
        async linkAccount(account) {
            return
        },
        async unlinkAccount({ providerAccountId, provider }) {
            return
        },
        async createSession({ sessionToken, userId, expires }) {
            return
        },
        async getSessionAndUser(sessionToken) {
            return
        },
        async updateSession({ sessionToken }) {
            return
        },
        async deleteSession(sessionToken) {
            return
        },
        async createVerificationToken({ identifier, expires, token }) {
            return
        },
        async useVerificationToken({ identifier, token }) {
            return
        },
    }
}
