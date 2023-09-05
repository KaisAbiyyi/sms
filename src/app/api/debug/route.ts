import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    function getRandomUsername(): string {
        const adjectives = ['Cool', 'Funny', 'Happy', 'Lucky', 'Silly', 'Smart', 'Clever', 'Witty'];
        const nouns = ['User', 'Person', 'Friend', 'Buddy', 'Challenger', 'Explorer', 'Gamer', 'Traveler'];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${randomAdjective}${randomNoun}`;
    }

    function getRandomName(): string {
        const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Fiona', 'George', 'Hannah'];
        return names[Math.floor(Math.random() * names.length)];
    }

    function getRandomEmail(): string {
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const username = getRandomUsername().toLowerCase();
        return `${username}@${randomDomain}`;
    }

    function getRandomBirthdate(): string {
        const year = Math.floor(Math.random() * 30) + 1970; // Random year between 1970 and 1999
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getRandomAddress(): string {
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco'];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        return `${randomCity}, USA`;
    }

    function getRandomHobby(): string[] {
        const hobbies = ['Reading', 'Gaming', 'Cooking', 'Traveling', 'Hiking', 'Photography', 'Swimming'];
        const numHobbies = Math.floor(Math.random() * 4) + 1; // Random number of hobbies (1-4)
        const randomHobbies: any = [];
        for (let i = 0; i < numHobbies; i++) {
            const randomHobby = hobbies[Math.floor(Math.random() * hobbies.length)];
            if (!randomHobbies.includes(randomHobby)) {
                randomHobbies.push(randomHobby);
            }
        }
        return randomHobbies;
    }

    // Generate 50 random data records
    const randomData = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        username: getRandomUsername(),
        name: getRandomName(),
        email: getRandomEmail(),
        birthdate: getRandomBirthdate(),
        address: getRandomAddress(),
        hobby: getRandomHobby(),
    }));
    return NextResponse.json({ randomData })
}