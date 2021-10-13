from app.models import db
from app.models import User,friends, pending_friends


# Adds a demo user, you can add other users here if you want
def seed_social():

    pending_friend1 = pending_friends.insert().values(acceptor_id=1,requester_id=2)
    friend1 = friends.insert().values(runner1_id=1,runner2_id=3)

    db.session.execute(pending_friend1)
    db.session.execute(friend1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_social():
    db.session.execute('TRUNCATE pending_friends RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.commit()



