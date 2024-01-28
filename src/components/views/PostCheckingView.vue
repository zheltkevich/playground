<script setup>
const createTrack = async () => {
    const url = 'https://postal-ninja.p.rapidapi.com/v1/track'
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json; charset=UTF-8',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key':
                '609763f4afmsh4b8d87358d7ae32p1490b4jsna28e5b272e7f',
            'X-RapidAPI-Host': 'postal-ninja.p.rapidapi.com',
        },
        body: new URLSearchParams({
            trackCode: 'URA00603053ZPRU',
        }),
    }

    try {
        const response = await fetch(url, options)
        const result = await response.text()
        // eslint-disable-next-line no-console
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}
const getTrack = async () => {
    const url = new URL(
        'https://postal-ninja.p.rapidapi.com/v1/track/%7Bid%7D?await=false&lang=AS_IS'
    )

    const pkgId = '53618942'
    url.searchParams.append('id', pkgId)

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json; charset=UTF-8',
            'X-RapidAPI-Key':
                '609763f4afmsh4b8d87358d7ae32p1490b4jsna28e5b272e7f',
            'X-RapidAPI-Host': 'postal-ninja.p.rapidapi.com',
        },
    }

    try {
        const response = await fetch(url, options)
        const result = await response.text()
        // eslint-disable-next-line no-console
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}

const ping = async () => {
    const url = 'https://postal-ninja.p.rapidapi.com/v1/ping'
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key':
                '609763f4afmsh4b8d87358d7ae32p1490b4jsna28e5b272e7f',
            'X-RapidAPI-Host': 'postal-ninja.p.rapidapi.com',
        },
    }

    try {
        const response = await fetch(url, options)
        const result = await response.text()
        // eslint-disable-next-line no-console
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <div>
        <button
            type="button"
            @click="createTrack">
            createTrack
        </button>
        <button
            type="button"
            @click="getTrack">
            getTrack
        </button>
        <button
            type="button"
            @click="ping">
            ping
        </button>
    </div>
</template>
