import { CustomDate } from "./Date";

const STATUS = {
  done: 'done',
  process: 'process',
  off: 'off',
} as const;
export type STATUS = typeof STATUS[keyof typeof STATUS];

export type Stream = {
  title: string,
  chatCount: string,
  superChatAmount: string,
  memberCount: string,
  channelTitle: string,
  id: string,
  thumbnail: string,
  status: STATUS,
  publishedAt: CustomDate,
  channelId: string
}

export type Channel = {
  title: string,
  id: string,
  superChatAmount: string,
  memberCount?: string,
  videoId: string,
}

export type Archive = {
  daily: string[],
  weekly: string[],
  monthly: string[],
}

export type User = {
  supporterChannelId: string,
  supporterDisplayName: string,
  thumbnail: string,
}

export type SuperChat = {
  user: User,
  totalAmount: string,
}

export type SuperChats = {
  title: string,
  superChats: SuperChat[],
  channelName?: string,
  superChatAmount?: string,
  startAt?: string,
}

export type SuperChatByChannels = {
  user: User,
  superChatByChannels: Channel[],
}