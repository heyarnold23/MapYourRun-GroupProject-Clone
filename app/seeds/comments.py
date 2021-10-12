from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment = Comment(
        body="You need more training.", author_id = 1, run_id=2
    )
    comment2 = Comment(
        body="That's all you could run? Do better", author_id = 2, run_id=3
    )
    comment3 = Comment(
        body="Weak run. Ever thought about improving?", author_id = 3, run_id=1
    )

    db.session.add(comment)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE runs RESTART IDENTITY CASCADE;')
    db.session.commit()
