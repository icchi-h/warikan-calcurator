const defaultLevel = 3

export const levels = [
  {
    level: 1,
    label: '安め',
    rate: 1
  },
  {
    level: 2,
    label: 'やや安め',
    rate: 2
  },
  {
    level: 3,
    label: '普通',
    rate: 3
  },
  {
    level: 4,
    label: 'やや高め',
    rate: 4
  },
  {
    level: 5,
    label: '高め',
    rate: 5
  }
]

export function getPerson(id, name) {
  return {
    id: id,
    name: name,
    level: defaultLevel,
    rate: levels[defaultLevel - 1].rate,
    fixed: false,
    price: 0
  }
}
