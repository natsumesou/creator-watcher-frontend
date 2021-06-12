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
}

export type Channel = {
  title: string,
  id: string,
  superChatAmount: string,
  memberCount: string,
  videoId: string,
}