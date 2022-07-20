import React from 'react'
import { Button } from 'react-bootstrap';
import linkShortener from '../../../../lib/linkShortener';

function list(props) {

    function removeHandler(ev, id) {
        console.log('id: ', id);
        fetch('/api/s/delete',
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            .then((res) => {
                return res.json();
            }).then((res => { console.log(res) }))
    }

    return (
        <table style={{
            textWrap: "normal",
            wordWrap: "break-word",
            maxWidth: "900px",
            border: "1px solid black",
            borderCollapse: "collapse"
        }}>
            <thead>
                <tr style={{ border: "1px solid black", textAlign: "center" }}>
                    <td>ShortlinkID</td>
                    <td>Original link</td>
                </tr>
            </thead>
            <tbody>
                {
                    props.shortLinks.map((link, index) => {
                        return (
                            <tr key={index} style={{ border: "1px solid black" }}>
                                <td>{link.shortLinkId}</td>
                                <td style={{ maxWidth: "500px" }}>{link.originalLink}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        type="submit"
                                        onClick={(ev) => removeHandler(ev, link._id)}
                                        value="Remove user"
                                    >
                                        Remove link
                                    </Button>
                                </td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table >
    )
}

export default list

export async function getServerSideProps(context) {
    const shortLinks = JSON.parse(JSON.stringify(await linkShortener.listAllLinks()));
    return {
        props: { shortLinks }, // will be passed to the page component as props

    }
}