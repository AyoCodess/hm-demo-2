// 'use node';

// import {
//   Expo,
//   ExpoPushMessage,
//   ExpoPushSuccessTicket,
//   ExpoPushTicket
// } from 'expo-server-sdk';

// import { internalAction } from './_generated/server';
// import { Infer, v } from 'convex/values';
// import { DataModel } from './_generated/dataModel';
// import { GenericActionCtx } from 'convex/server';
// import { internal } from './_generated/api';
// import { scheduleDeletePushToken } from './userPushTokens';

// // Create a new Expo SDK client
// // optionally providing an access token if you have enabled push security
// const expo = new Expo({ accessToken: process.env.PUSH_ACCESS_TOKEN });

// /** the push token for a desired recipient of a message */
// type PushMessageTo = { messageTo: ExpoPushMessage['to'] };
// export type TokenAndTicket = ExpoPushTicket & PushMessageTo;

// const sendMessagesArgs = {
//   messages: v.array(
//     v.object({
//       title: v.optional(v.string()),
//       body: v.optional(v.string()),
//       pushToken: v.string()
//     })
//   )
// };

// /**
//  * Sends push notifications using Expo client. Schedules mutations to delete
//  * push tokens that are invalid or return tickets with DeviceNotRegistered.
//  * Schedules an action to handle notification receipts.
//  *
//  * @param ctx Convex action context
//  * @param messages messages to send
//  */
// export const sendMessagesHandler = async (
//   ctx: GenericActionCtx<DataModel>,
//   messages: Infer<typeof sendMessagesArgs.messages>
// ) => {
//   // Create the messages that you want to send to clients
//   const toSend: ExpoPushMessage[] = [];

//   for (const message of messages) {
//     // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
//     if (!Expo.isExpoPushToken(message.pushToken)) {
//       console.error(
//         `Push token ${message.pushToken} is not a valid Expo push token`
//       );
//       await scheduleDeletePushToken(ctx, message.pushToken);
//       continue;
//     }

//     toSend.push({
//       to: message.pushToken,
//       title: message.title,
//       body: message.body
//     });
//   }

//   const chunks = expo.chunkPushNotifications(toSend);
//   // we want to associate each push ticket with its corresponding push token
//   const tokenAndTickets: TokenAndTicket[] = [];
//   for (const chunk of chunks) {
//     try {
//       const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//       ticketChunk.forEach(async (ticket, index) => {
//         const messageTo = chunk[index].to;
//         // https://docs.expo.dev/push-notifications/sending-notifications/#push-ticket-errors
//         if (
//           ticket.status === 'error' &&
//           ticket.details?.error === 'DeviceNotRegistered'
//         ) {
//           if (Array.isArray(messageTo)) {
//             // TODO: is this case even possible?
//           } else {
//             // delete this push token
//             await scheduleDeletePushToken(ctx, messageTo);
//           }
//         }
//         tokenAndTickets.push({
//           ...ticket,
//           messageTo
//         });
//       });
//     } catch (error) {
//       // TODO: I'm not sure what error this is supposed to catch?
//       console.error(error);
//     }
//   }

//   await ctx.scheduler.runAfter(0, internal.pushNotifications.handleTickets, {
//     tokenAndTickets
//   });
// };

// export const sendMessages = internalAction({
//   args: sendMessagesArgs,
//   handler: (ctx, args) => sendMessagesHandler(ctx, args.messages)
// });

// const isSuccessTicket = (
//   ticket: TokenAndTicket
// ): ticket is ExpoPushSuccessTicket & PushMessageTo => ticket.status === 'ok';

// /**
//  * Requests push receipts for the given push tokens. Schedules mutations to
//  * delete push tokens corresponding to DeviceNotRegistered errors.
//  *
//  * @param ctx Convex action context
//  * @param tokenAndTickets push tickets and their corresponding push tokens
//  */
// export const handleTicketsHandler = async (
//   ctx: GenericActionCtx<DataModel>,
//   tokenAndTickets: TokenAndTicket[]
// ) => {
//   const filteredTokenAndTickets = (tokenAndTickets as TokenAndTicket[]).filter(
//     isSuccessTicket
//   );

//   const ticketIdToToken = new Map<
//     ExpoPushSuccessTicket['id'],
//     PushMessageTo['messageTo']
//   >(filteredTokenAndTickets.map((ticket) => [ticket.id, ticket.messageTo]));

//   const receiptIdChunks = expo.chunkPushNotificationReceiptIds(
//     filteredTokenAndTickets.map((ticket) => ticket.id)
//   );
//   // Like sending notifications, there are different strategies you could use
//   // to retrieve batches of receipts from the Expo service.
//   for (const chunk of receiptIdChunks) {
//     try {
//       const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
//       for (const receiptId in receipts) {
//         const receipt = receipts[receiptId];
//         const { status, details } = receipt;
//         if (status === 'ok') {
//           continue;
//         } else if (status === 'error') {
//           console.error(
//             `There was an error sending a notification: ${receipt.message}`
//           );
//           if (details && details.error) {
//             // https://docs.expo.dev/push-notifications/sending-notifications/#push-receipt-errors
//             console.error(`The error code is ${details.error}`);
//             if (details.error === 'DeviceNotRegistered') {
//               const pushToken = ticketIdToToken.get(receiptId);
//               if (pushToken && !Array.isArray(pushToken)) {
//                 await scheduleDeletePushToken(ctx, pushToken);
//               } else {
//                 // TODO: what if pushTokens is an array (is this even possible)
//               }
//             } else if (details.error === 'MessageRateExceeded') {
//               // TODO: resend the message?
//             } else {
//               // TODO: handle the other errors?
//             }
//           }
//         }
//       }
//     } catch (error) {
//       // TODO: I'm not sure what error this is supposed to catch?
//       console.error(error);
//     }
//   }
// };

// export const handleTickets = internalAction({
//   args: {
//     tokenAndTickets: v.array(v.any())
//   },
//   handler: (ctx, args) => handleTicketsHandler(ctx, args.tokenAndTickets)
// });
