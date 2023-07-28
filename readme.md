# Bees Backend API

## Overview

This is an anonymous chat api for Bees the website. The api uses a session based authentication to identify each unique users who wants to chat.
A user that has created a session can:

- create/join rooms
- look at current users at the room they have joined
- create messages to the room
- get messages from the room you have joined

All of the users and room you have created will only last for a day. And the current rooms that have expired will be archived.
You cannot chat in archived rooms but you can see all the messages.

## Routes
