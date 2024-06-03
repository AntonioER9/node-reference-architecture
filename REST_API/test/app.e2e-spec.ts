import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const token =
    'eyJraWQiOiJkNmZlY2EwMmEwMWFlMWYxNDEzYjYwNzJlMjFiNzUyNDk3MzU0MTA3ZDRhZDFjNmZlMDU4ZDM5ZDI4NTFiMGZjOGM1MWJlMjU4ZjYxYmE2MCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJodHRwOi8vMTAuMC4yLjI6ODA4MCIsImlhdCI6MTY0OTg5NDMxNSwiZXhwIjo0MTAyNDYyNzk5LCJuYmYiOjE2NDk4OTQzMDUsInN1YiI6IjZjODRmYjkwLTEyYzQtMTFlMS04NDBkLTdiMjVjNWVlNzc1YSIsImFtciI6WyJwd2QiXSwic2NvcGUiOiJkdW1teSIsImNsaWVudF9pZCI6ImR1bW15Y2xpZW50aWQifQ.AJ_QJ8dqGp3r7OPltQvs_C7U-k_VdvEoxnl5HXQK4n8B0wFYZp0WEHnvXUf4CqCKyDa1jA_8dt3HLOb36nvAuRFKn8Tn7vNPKVxCqvC4AAWJRA4MMi4Ud70eTOwvSAGmAbc5HuBu8TCmK70qtACPsVr1LHF1cwKGX6iTGX6ZCzc5YglnQAKKHZ_26RnXJO8gtAyCLBvCvDB0oCX4DU5N2Mox6V8t4JgHxHD6wZ4DXJQtIYR8jCiiWQO8qQC4mfi6UusrRx9WCQJREtJaquoaV4jFzJbnUoiAc-wvNsgSUwp2jB7VNMUeIlAptpyi2fq8hJgJfzgjhOzi1F45tIGCfQ';

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', 'bearer ' + token)
      .expect(200)
      .expect(
        'Hello World!! Your user id is: 6c84fb90-12c4-11e1-840d-7b25c5ee775a',
      );
  });
});
