import bcrypt from 'bcryptjs';

const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    avatar:
      'https://gravatar.com/avatar/a9a5b0968dbea215c3fc8dd56c0234a5?d=mm&r=pg&s=200',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jDoe@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    isPremium: true,
    premiumAt: Date.now(),
    avatar: 'https://i.pravatar.cc/250?img=1',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johnD@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: 'https://i.pravatar.cc/250?img=2',
  },
  {
    firstName: 'Vegan',
    lastName: 'Fruitarian',
    email: 'veganF@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: 'https://i.pravatar.cc/250?img=3',
  },
  {
    firstName: 'Vegan',
    lastName: 'Life',
    email: 'vLife@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: 'https://i.pravatar.cc/250?img=4',
  },
  {
    firstName: 'Abe',
    lastName: 'Clayton',
    email: 'abC@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: 'https://i.pravatar.cc/250?img=5',
  },
  {
    firstName: 'Grace',
    lastName: 'Waters',
    email: 'gWaters@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: 'https://i.pravatar.cc/250?img=6',
  },
  {
    firstName: 'Brenda',
    lastName: 'Fernandez',
    email: 'bFern@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: 'https://i.pravatar.cc/250?img=7',
  },
  {
    firstName: 'Carol',
    lastName: 'Danvas',
    email: 'cDan@iavh.com',
    isPremium: true,
    premiumAt: Date.now(),
    password: bcrypt.hashSync('123456', 10),
    avatar: 'https://i.pravatar.cc/250?img=8',
  },
  {
    firstName: 'Stephen',
    lastName: 'Strange',
    email: 'sStr@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: 'https://i.pravatar.cc/250?img=9',
  },
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tSt@iavh.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: 'https://i.pravatar.cc/250?img=10',
  },
];

export default users;
