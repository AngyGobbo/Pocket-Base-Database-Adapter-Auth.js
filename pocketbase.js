//You will be required to install Pocketbase for this project.
import PocketBase from 'pocketbase';

//This is the main gateway for connection to Pocketbase. I am using the default settings for this project but, you can switch it as desired.
const pb = new PocketBase('http://127.0.0.1:8090');

/** @return { import("next-auth/adapters").Adapter } */
export default function PocketBaseDB(client, options = {}) {
    return {
        //This is called everytime a user is created. By default Auth.js creates a user when logging in if one doesn't already exist.
        async createUser(user) {
            //Try for the database connection
            try {
                //Creates a user if it doesn't already exist
                const user_create_body = {
                    "email": user.email,
                    "emailVisibility": false,
                    "name": user.name,
                    "role": "Pending",
                    "beta_tester": false,
                    //I am not using password authentication so this will need to be changed to not be required
                    "password": "123456789",
                    "passwordConfirm": "123456789"
                };

                const record_created = await pb.collection('users').create(user_create_body);

                //Returns the database record after the user is created.
                return await record_created
            }
            //Catch for any errors that may appear. This will also catch instances where an account is already created, so additional logic will/may need to be added.
            catch (error) {
                console.log("Create user failed to perform")
            }
        },
        async getUser(id) {

            return
        },
        async getUserByEmail(email) {

            return
        },
        async getUserByAccount({ providerAccountId, provider }) {
            //Checks what provider it is. This can be expanded upon later to support addiitonal services outside of Discord
            switch(provider)
            return
        },
        async updateUser(user) {

            return
        },
        async deleteUser(userId) {

            return
        },
        async linkAccount(account) {

            console.log(account)
            //Creates an account if it doesn't already exist, and ties it to the user
            const body = {
                "userId": account.userId,
                "type": account.type,
                "provider": account.provider,
                "providerAccountId": account.providerAccountId,
                "refresh_token": account.refresh_token,
                "access_token": account.access_token,
                "expires_at": account.expires_at,
                "token_type": account.token_type,
                "scope": account.scope,
                //"id_token": account,
                //"session_state": account,
                "user": account.userId
            };

            const record = await pb.collection('account').create(body);

            return
        },
        async unlinkAccount({ providerAccountId, provider }) {

            return
        },
        async createSession({ sessionToken, userId, expires }) {

            try {

                const create_session = {
                    "timestamp": "2026-10-13 20:44:46.349Z",
                    "sessionToken": sessionToken,
                    "userId": userId,
                    "user": userId
                };

                const created_session = await pb.collection('session').create(create_session);
                return created_session

            } catch (error) {
                console.log(error)

                return
            }
        },
        async getSessionAndUser(sessionToken) {
            if (!sessionToken) {
                return null
            } else {
                try {
                    const current_session = await pb.collection('session').getFirstListItem(
                        `sesssionToken="${sessionToken}"`
                    );

                    try {
                        const current_user = await pb.collection('users').getOne(current_session.id);
                    }
                    catch(error) {
                        console.log("Error with user search: ", current_session)
                    }
                }
                catch(error) {

                }
            }
        },
        async updateSession({ sessionToken }) {

            return sessionToken
        },
        async deleteSession(sessionToken) {

            return
        },
        async createVerificationToken({ identifier, expires, token }) {

            return token
        },
        async useVerificationToken({ identifier, token }) {

            return null
        },
    }
}
