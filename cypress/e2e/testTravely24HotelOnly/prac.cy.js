

describe('test && ',()=> {
    const a = 10
    const b = '10'
    const c = 12
    const d = 123
    const f = 10
    const f2= 10

    it('compare',()=> {
        expect(a).to.eq(f || 11 )
    })
})
