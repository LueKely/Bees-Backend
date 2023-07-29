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

### Session

#### GET `api/session`

- generates your session for the day

Response:

`success`

#### GET `api/session/user`

- gets your user info

Response:

`{ 
  user_id:int, 
created_at:date(now)
}`

#### GET `api/session/`

- gets all users that are not outdated

Response:

`{user_id:int,created_at:date(now)}[]`

### ROOMS

#### `POST 'api/room/'`

Creates a room
Body:

`{
name: string
description: string
}`

Response:

`room id:number`

#### `GET api/room/`

- gets all rooms that are active

#### `GET api/room/archived`

- gets all rooms that are archived

#### `POST api/room/participants/:id`

- create and join the room
  params:

`id: number` - the room id

Response:
success

#### `GET api/room/participants/:id`

params:

`id: number` - the room id

Response:
`[]`

#### `Get api/:user_id`

gets the room the user joined

params:
`user_id: the user id`

Response:
`[]`

### CHAT

#### `POST api/chat/:room_id`

params:

`{room_id: string}`

body:

{ date:date(now) - date ng room
message: string,
userId: number
}

#### `GET api/chat/:room_id`

params:

{room_id: string}

body:
{user_id:int}
