/**
 * @license
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { product } from '../src/cartesian';

async function* gen1() {
  yield 1;
  yield Promise.resolve(2);
  yield 3;
}

async function* gen2() {
  yield 4;
}

async function* gen3() {
  yield 5;
  yield 6;
}

describe('cartesian', () => {
  describe('product', () => {
    it('yields the cartesian product of the yielded items', async () => {
      const cart = product(gen1(), gen2(), gen3());

      const expected = [
        [1, 4, 5],
        [2, 4, 5],
        [3, 4, 5],
        [1, 4, 6],
        [2, 4, 6],
        [3, 4, 6],
      ];

      const result = [];
      for await (let value of cart) {
        result.push(value);
      }

      assert.sameDeepMembers(expected, result, 'yields the expected items');
    });
  });
});
