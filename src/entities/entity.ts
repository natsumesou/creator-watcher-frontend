import { CustomDate } from "./Date";

const STATUS = {
  done: 'done',
  process: 'process',
  off: 'off',
} as const;
export type STATUS = typeof STATUS[keyof typeof STATUS];

export type StreamMeta = {
  id: string,
  channelId: string
  title: string,
}

export type Stream = {
  meta: StreamMeta,
  chatCount: string,
  superChatAmount: string,
  memberCount: string,
  channelTitle: string,
  thumbnail: string,
  status: STATUS,
  publishedAt: CustomDate,
}

export type ChannelMeta = {
  id: string,
  title: string,
  category?: string,
}

export type Channel = {
  meta: ChannelMeta,
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
  publishedAt?: CustomDate,
}

export type SuperChatByChannels = {
  user: User,
  totalAmount: string,
  superChatByChannels: Channel[],
}