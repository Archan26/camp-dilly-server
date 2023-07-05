const { Customer } = require('../../model/index.js');

// Form fill up
exports.form = (req, res) => {
  const {
    customerName, typeOfCustomer, contactNumber, emailId, siteName, packageType, numberOfPeople, dayPicnicTime, overNightRooms, overNightCrossCamp, overNightTent, overNightSkyRooms, overNightDay, foodPreference, bookingDate, checkInDate, checkOutDate, advancePayment, totalPayment } = req.body;

  const formData = new Customer({
    customerName, typeOfCustomer, contactNumber, emailId, siteName, packageType, numberOfPeople, dayPicnicTime, overNightRooms, overNightCrossCamp, overNightTent, overNightSkyRooms, overNightDay, foodPreference, bookingDate, checkInDate, checkOutDate, advancePayment, totalPayment
  });

  formData.save()
    .then(() => {
      res.status(200).send('Submit successfully');
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    })
};

// Customer Statistics
exports.statistics = async (req, res) => {
  try {
    const schoolCount = await Customer.countDocuments({ typeOfCustomer: 'School' })
    const corporateCount = await Customer.countDocuments({ typeOfCustomer: 'Corporate' })
    const tuitioonOrCollegeCount = await Customer.countDocuments({ typeOfCustomer: 'Tuition or College' })
    const familyOrSocialCount = await Customer.countDocuments({ typeOfCustomer: 'Family or Social' })
    const otherCount = await Customer.countDocuments({ typeOfCustomer: 'Other' })
    const typeOfCustomerCounts = {
      schoolCount,
      corporateCount,
      tuitioonOrCollegeCount,
      familyOrSocialCount,
      otherCount
    }
    const totalVisitedGuest = await Customer.find({}, 'numberOfPeople')
    let totalGuest = 0;
    if (totalVisitedGuest) {
      totalVisitedGuest.forEach(count => {
        totalGuest += count.numberOfPeople;
      });
    }

    const advancedPayment = await Customer.find({}, 'advancePayment')
    let advancePayment = 0;
    if (advancedPayment) {
      advancedPayment.forEach(count => {
        advancePayment += count.advancePayment;
      });
    }

    const dayPicnicCount = await Customer.countDocuments({ packageType: 'Day Picnic' })
    const overNightCount = await Customer.countDocuments({ packageType: 'Over Night' })

    const packageTypeCount = {
      dayPicnicCount,
      overNightCount
    }
    res.status(200).send({ typeOfCustomerCounts, totalGuest, packageTypeCount, advancePayment });
  } catch (err) {
    res.status(500).send({ msg: 'Internal server error' });
  }
};


// get customer
exports.getFormData = async (req, res) => {
  Customer.find()
  .then((formData) => {
    res.status(200).json(formData);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });
};



//get customer by ID
exports.getCustomerById = async (req, res) => {
  const customerId = req.params.id;

  Customer.findById(customerId)
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json(customer);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};




