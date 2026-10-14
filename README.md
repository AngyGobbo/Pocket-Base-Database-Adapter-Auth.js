# Pocketbase Adapter for Auth.js
This is my attempt at creating a pocketbase adapter for Auth.js using JavaScript. Please keep in mind this is my first public project and is intended for personal use as I learn to code. You are welccome to use it but, I am not responsible for what happens. Feedback is appreciated. 

This is just the file I am using for the adapter. This was designed to work in a Next.js project. This adapter should work with Discord's oAuth initially but, the goal is to support as many providers as possible eventually. 

Current Notes

Method run order on initial oAuth sign-in:
1. getUserByAccount({ provider, providerAccountId })
2. createUser(profile) // If user doesn't exist
3. linkAccount(account)
4. createSession(session)

