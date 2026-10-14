# FoxTales Game Specification

## Platform

- Browser games: Bingo first, later Solitaire and Hearts.
- Future expansion to other games and book-inspired themes.
- Guest gameplay without mandatory registration.
- Player progress and inventory are saved.

## FoxTales Bingo (Confirmed)

### Rules

- Traditional 75-ball Bingo with standard B-I-N-G-O number ranges and a free center square.
- Randomly generated cards and ball draws, without duplicate draws.
- Five in a row wins: 5 horizontal, 5 vertical and 2 diagonal lines (12 patterns). The FREE center counts automatically. Four corners is not a winning pattern.
- Players choose 1 to 6 cards per round (default 1). All cards share one ball draw sequence, and each card keeps its own marks, winning line and Bingo celebration.
- Every selected card can win independently in the same round. A Bingo on one card does not end the round; drawing continues until all 45 initial balls are drawn, and each winning card keeps its Bingo indicator until the round ends. Marking called squares stays possible after the final draw.
- Balls are drawn automatically, one unique ball every 3 seconds, after the player starts drawing. Winning never pauses drawing.
- A card can complete several of the 12 lines. Each distinct completed line counts once. Titles: 1 = BINGO!, 2 = DOUBLE BINGO!, 3 = TRIPLE BINGO!, 4 = GRANDE BINGO!, 5 = SUPER BINGO!.
- The maximum is 5 Bingos per card. A card never exceeds 5 even if one mark completes more lines. At 5 (SUPER BINGO!) the card is locked for the rest of the round: its marks and winning lines are preserved, and numbered squares can no longer be marked. Other cards stay playable, and a new round resets every card.
- Bingo levels can rise after the final draw while the player marks missed numbers.
- The card count is fixed once drawing starts; changing it requires a new round.
- Standard round: 45 balls.
- Optional Second Chance: costs additional coins and provides 5 extra randomly drawn balls, once per round.
- No increasing difficulty between levels.

### Presentation

- Animated fox characters and woodland-themed interface.

### Book Adventure

- Each book adventure contains 30 Bingo levels.
- The book title stays hidden while the player collects clues.
- Each completed level unlocks one book clue and one visual element.
- Players can guess the hidden book.
- Prize wheel at level 15.
- Mystery-box rewards at level 30.
- Hidden answers and unrevealed clues are never exposed to the client.

### Economy

- Virtual coins are earned through gameplay.
- Coins are spent on entering levels and on selected helpers.
- Helpers: Time Freeze, 1/2/3 Lucky Daubs, extra coins, mystery boxes, and a rare instant-win reward.
- Lucky Daubs randomly cover 1, 2 or 3 eligible unmarked squares on the player's card, excluding the FREE center.
- Lucky Daubs can cover numbers that have not yet been called, and the covered squares count toward Bingo.

## Undecided (TBD)

- Level entry cost and starting coins
- Coins earned per round, win or loss
- Second Chance exact cost (15 coins proposed)
- Helper prices, availability and limits
- Time Freeze: whether rounds are timed, duration of the freeze
- Draw speed and whether daubing is manual or automatic
- Prize wheel segments, rewards and odds
- Mystery-box contents and odds
- Rare instant-win reward: odds and how it is obtained
- Whether mystery boxes also appear before level 30
- Book guess rules: attempts, penalties, rewards
- Number of books at launch, themes and how new books unlock
- Behavior after losing a level and replay rules
- Optional registration and guest-to-account progress transfer
- Rules for Solitaire and Hearts
