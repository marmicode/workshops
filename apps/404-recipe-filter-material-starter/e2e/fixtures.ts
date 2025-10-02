import { test as base } from '@playwright/test';

export const test = base.extend<Fixtures>({
  testUserInfo: async ({ request }, use) => {
    console.log('Creating user...');
    // const response = await request.post('/users', {
    //   data: {
    //     email: 'test@test.com',
    //     password: 'test',
    //   },
    // });
    // const userInfo: UserInfo = await response.json();

    const userInfo: UserInfo = {
      id: '1',
      email: 'test@test.com',
      password: 'test',
    };

    await use(userInfo);

    console.log('Deleting user...');
    // await request.delete(`/users/${userInfo.id}`);
  },
});

interface Fixtures {
  testUserInfo: UserInfo;
}

interface UserInfo {
  id: string;
  email: string;
  password: string;
}
