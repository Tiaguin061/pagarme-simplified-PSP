import { describe, expect, it } from '@jest/globals';

import { Entity } from './Entity';

class CustomEntity extends Entity<{}> { }

describe('Core Entity', () => {
  it('should generate an ID if not provided', () => {
    const entity = new CustomEntity({})

    expect(entity.id).toBeTruthy()
  })

  it('should use the provided ID if provided', () => {
    const entity = new CustomEntity({}, 'custom-id')

    expect(entity.id).toEqual('custom-id')
  })
});