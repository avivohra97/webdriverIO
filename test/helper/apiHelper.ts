import request from "supertest"
import reporter from "../helper/reporter"

async function GET( baseURL: string, endpoint: string, queryParam: object,) {
    if (!baseURL || !endpoint) {
        throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid `)
    }
    baseURL = baseURL.trim()
    endpoint = endpoint.trim()
    await reporter.addStep("info", `Making a GET to ${baseURL}/${endpoint}: ${JSON.stringify(queryParam)}`)
    try {
        return await request(baseURL)
            .get(endpoint)
            .query("page=2")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
    } catch (err) {
        err.message = `Error making a GET call to ${endpoint}, ${err}`
        throw err
    }
}
async function POST( baseURL: string, endpoint: string,  payload: object,) {
    if (!baseURL || !endpoint) {
        throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid `)
    }
    baseURL = baseURL.trim()
    endpoint = endpoint.trim()
    reporter.addStep( "info", `Making a POST to ${endpoint}`)
    try {
        return await request(baseURL)
            .post(endpoint)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            // .set("Cookie", `_ga_7NSY3FGX8B=GS2.1.s1753008022$o1$g0$t1753008022$j60$l0$h0; _ga=GA1.1.1205330022.1753008023; .Nop.Antiforgery=CfDJ8FWdXhWdO0ZGuubdDsEUBzycI72ebuEyVcT0qgB0Dh3IZHlq5Skq4VW0W37WTDF6Kdh72h86CjAfmRCZS9Zpusl7P4H3w3jXY7rJ9jMljcOO2g-0WvI_hsOQ74vrcYq_78C9-tnk70HXWdPznl1PcTk; .Nop.Authentication=CfDJ8FWdXhWdO0ZGuubdDsEUBzxYmsE3rFFtbk3G2ByfByfphe67rGef80YFlvnEXxnyhcp9BnHTcM3fKn7DuW-OceXzaWj0Cl1R_itHaCyY8WKQdVJw6hJ_0otI3-Hdv3Aguk7l4wXpL1uNBdAveOYT1x3O5IsvcEMyAMwnp8MNiMFPSZ8xkVsCOEdKDH7paD3rCqdNBt_2-NtmixApgVQPLKDGlpnIWH_mcvETEt8Pfz1Z1bsfJt-pyZJCtiYKY79M_R6VNo9dx7IquuEEo7zS4IYUe4z3biuZIMVLCFvEmtd81eQ-zav09eEH70mhrm3j263Ige8iKr34vcPJ1uq5Gw8s0axCnvae_JQO_yj_yLPFSvXaYBzHr9SMGhf7OXKlm10_gX7KgdnIDZb_NMYl3b96w3uAT4tDHqBvBLKBRSjKU9dyakAmIu82WQ6B2J-IG2cCsM6Uzte1xs1ASaU9zb8Dk1pvkR9qjJBIzGx1SK_X1GRgmSCgieCdxRFzvnIXyLYKL0icF79nxKZRovf4f5GhvRHVs3bRJdI4WoS0fk4V1ukpX0nV8GvXQXWMsVKxYg; cf_clearance=NC4R_Aq0ZHlCXSborxm4HWA2KU.CyX1SzNfdZimXqNc-1753023909-1.2.1.1-3SvSyY_Bvh6v8lR.k2qO3DIP2enE8o6JB.GW3X5.8gEBDjcOlIUusVZHgaxFbQfKWEYpS7sg7KX2ZgmS_tgzHMNlLfsjxVO94TUFfs0cdK1Dl8WWV9l0XHUOxlu6eSVW8OAqZJywaJSHuuvftgzOX5SoL1iWRNkmXbnDBUk21Xf6bqHasJmVqG.Q0XaVHDceypliG8X09nmNjE9Ogs.t3wDVFQjaLDK2DA.KE3oCClk; _ga_2NJTDMQ3JH=GS2.1.s1753023905$o2$g1$t1753023924$j41$l0$h0; .Nop.Customer=75f87c18-2e02-403e-9f36-764f6e9f5c98; .Nop.Culture=c%3Den-US%7Cuic%3Den-US`)
            .send(payload)
    } catch (err) {
        err.message = `Error making a POST call to ${endpoint}, ${err}`
        throw err
    }
}

export default { GET, POST }