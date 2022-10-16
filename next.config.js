/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/posts',
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig
